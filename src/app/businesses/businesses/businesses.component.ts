import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { OfficeModel } from 'src/app/auth/office.model';
import { ConstructionsService } from 'src/app/constructions/constructions.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { buildExcel } from 'src/app/xlsx';
import { BusinessModel } from '../business.model';
import { BusinessesService } from '../businesses.service';
import { DialogConstructionBusinessesComponent } from '../dialog-construction-businesses/dialog-construction-businesses.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserModel } from 'src/app/users/user.model';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';

@Component({
    selector: 'app-businesses',
    templateUrl: './businesses.component.html',
    styleUrls: ['./businesses.component.sass']
})
export class BusinessesComponent implements OnInit {

    constructor(
        private readonly businessesService: BusinessesService,
        private readonly navigationService: NavigationService,
        private readonly constructionsService: ConstructionsService,
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly workersService: WorkersService,
        private readonly matDialog: MatDialog,
        private readonly formBuilder: FormBuilder,
    ) { }

    displayedColumns: string[] = ['document', 'name', 'email', 'emailPerfilprov', 'mobileNumber', 'mobileNumberPerfilprov', 'actions'];
    dataSource: BusinessModel[] = [];
    length: number = 100;
    pageSize: number = 10;
    pageSizeOptions: number[] = [10, 30, 50];
    pageIndex: number = 0;
    workers: WorkerModel[] = [];
    months: any[] = [
        'ENERO',
        'FEBRERO',
        'MARZO',
        'ABRIL',
        'MAYO',
        'JUNIO',
        'JULIO',
        'AGOSTO',
        'SEPTIEMBRE',
        'OCTUBRE',
        'NOVIEMBRE',
        'DICIEMBRE',
    ];
    formGroup: FormGroup = this.formBuilder.group({
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
        isOnlyPartnership: '',
        workerId: ''
    });
    private office: OfficeModel = new OfficeModel();
    private user: UserModel | null = null;
    private params: Params = {};

    private handleSearch$: Subscription = new Subscription();
    private handleClickMenu$: Subscription = new Subscription();
    private handleAuth$: Subscription = new Subscription();
    private queryParams$: Subscription = new Subscription();
    private handleWorkers$: Subscription = new Subscription();

    ngOnDestroy() {
        this.handleSearch$.unsubscribe();
        this.handleClickMenu$.unsubscribe();
        this.handleAuth$.unsubscribe();
        this.queryParams$.unsubscribe();
        this.handleWorkers$.unsubscribe();
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Empresas');

        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true },
            { id: 'export_businesses', label: 'Exportar excel', icon: 'download', show: false }
        ]);

        this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
            this.office = auth.office;
        });

        this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
            this.workers = workers;
        });

        this.queryParams$ = this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
            const { pageIndex, pageSize, startDate, endDate, workerId } = params;
            this.pageIndex = Number(pageIndex || 0);
            this.pageSize = Number(pageSize || 10);
            if (startDate && endDate) {
                this.formGroup.patchValue({ startDate: new Date(startDate), endDate: new Date(endDate) });
                Object.assign(this.params, { startDate: new Date(startDate), endDate: new Date(endDate) });
            }
            if (workerId) {
                this.formGroup.patchValue({ workerId });
                Object.assign(this.params, { workerId });
            }
            this.fetchData();
            this.fetchCount();
        });

        this.handleSearch$ = this.navigationService.handleSearch().subscribe((key: string) => {
            this.navigationService.loadBarStart();
            this.businessesService.getBusinessesByKey(key).subscribe(businesses => {
                this.navigationService.loadBarFinish();
                this.dataSource = businesses;
            }, (error: HttpErrorResponse) => {
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage(error.error.message);
            });
        });

        this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
            switch (id) {
                case 'export_businesses': {
                    this.downloadExcel();
                    break;
                }
                default:
                    break;
            }
        });
    }

    onSelectChange() {
        this.pageIndex = 0;

        const { isOnlyPartnership, workerId } = this.formGroup.value;
        console.log(typeof (workerId));
        const queryParams: Params = { isOnlyPartnership, workerId, pageIndex: 0 };

        Object.assign(this.params, queryParams);

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        });

        this.fetchData();
        this.fetchCount();
    }

    onRangeChange() {
        if (this.formGroup.valid) {
            this.pageIndex = 0;

            const { startDate, endDate } = this.formGroup.value;
            const queryParams: Params = { startDate: startDate, endDate: endDate, pageIndex: 0 };

            Object.assign(this.params, { startDate, endDate });

            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: queryParams,
                queryParamsHandling: 'merge', // remove to replace all query params by provided
            });

            this.fetchData();
            this.fetchCount();
        }
    }

    fetchCount() {
        this.businessesService.getCountBusinesses(this.params).subscribe(count => {
            this.length = count;
        });
    }

    fetchData() {
        this.navigationService.loadBarStart();
        this.businessesService.getBusinessesByPage(this.pageIndex + 1, this.pageSize, this.params).subscribe(businesses => {
            this.navigationService.loadBarFinish();
            this.dataSource = businesses;
        });
    }

    onShowConstructions(businessId: string) {
        const dialogRef = this.matDialog.open(DialogConstructionBusinessesComponent, {
            width: '600px',
            position: { top: '20px' },
            data: businessId,
        });
    }

    onDelete(businessId: string) {
        const ok = confirm('Esta seguro de aliminar?...');
        if (ok) {
            this.navigationService.loadBarStart();
            this.businessesService.delete(businessId).subscribe(() => {
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage('Eliminado correctamente');
                this.fetchData();
            });
        }
    }

    onExportConstructions(businessId: string) {
        if (this.user && this.user.isAdmin) {
            this.navigationService.loadBarStart();
            this.constructionsService.getConstructionsByBusiness(businessId).subscribe(constructions => {
                this.navigationService.loadBarFinish();
                const wscols = [40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
                let body = [];
                body.push([
                    'ESTADO DE O.',
                    'CLIENTE',
                    'CONSORCIO',
                    'PERSONAL',
                    'OBJETO',
                ]);
                for (const construction of constructions) {
                    body.push([
                        construction.constructionCodeType,
                        construction.business.name,
                        construction.partnership?.name,
                        construction.worker?.name,
                        construction.percentCompletion?.month ? this.months[construction.percentCompletion?.month] : '',
                        construction.percentCompletion?.year,
                        construction.object,
                    ]);
                }
                const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}_${this.office.name.toUpperCase()}`;
                buildExcel(body, name, wscols, [], []);
            }, (error: HttpErrorResponse) => {
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage(error.error.message);
            });
        } else {
            this.navigationService.showMessage('Esta opcion es solo para administradores');
        }
    }

    downloadExcel() {
        this.navigationService.loadBarStart();
        const chunk = 500;
        const promises: Promise<any>[] = [];

        for (let index = 0; index < this.length / chunk; index++) {
            const promise = this.businessesService.getBusinessesByPage(index + 1, chunk, this.params).toPromise();
            promises.push(promise);
        }

        Promise.all(promises).then(values => {
            const businesses = values.flat();
            this.navigationService.loadBarFinish();
            const wscols = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
            let body = [];
            body.push([
                'RUC',
                'RAZON SOCIAL',
                'EMAIL',
                'CELULAR',
                'PERSONAL A CARGO',
                'DEPARTAMENTO O.',
                'PROVINCIA O.',
                'DISTRITO O.',
                'DEPARTAMENTO R.',
                'PROVINCIA R.',
                'DISTRITO R.',
                'SEDE',
                'ULT. ENCUESTA'
            ]);
            for (const business of businesses) {
                body.push([
                    business.document,
                    business.name,
                    business.email,
                    business.mobileNumber,
                    business.worker.name,
                    (business.departmentOrigin || '').toUpperCase(),
                    (business.provinceOrigin || '').toUpperCase(),
                    (business.districtOrigin || '').toUpperCase(),
                    (business.departmentResidence || '').toUpperCase(),
                    (business.provinceResidence || '').toUpperCase(),
                    (business.districtResidence || '').toUpperCase(),
                    business.office.name.toUpperCase(),
                    business.lastSurvey ? formatDate(new Date(business.lastSurvey.createdAt), 'dd/MM/yyyy', 'en-US') : null,
                ]);
            }
            const name = `EMPRESAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
            buildExcel(body, name, wscols, [], []);
        });
    }

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;

        const queryParams: Params = { pageIndex: this.pageIndex, pageSize: this.pageSize };

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        });

        this.fetchData();
    }

}
