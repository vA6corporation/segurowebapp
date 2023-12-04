import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { UserModel } from 'src/app/users/user.model';
import { buildExcel } from 'src/app/xlsx';
import { DialogSeaceDetailsComponent } from '../dialog-seace-details/dialog-seace-details.component';
import { SeaceDataModel } from '../seace-data.model';
import { SeaceService } from '../seace.service';
import { DialogOffersComponent } from '../dialog-offers/dialog-offers.component';
import { DialogEditSeaceInboxComponent } from '../dialog-edit-seace-inbox/dialog-edit-seace-inbox.component';
import { DialogBaseComponent } from '../dialog-base/dialog-base.component';

@Component({
    selector: 'app-seace-inbox',
    templateUrl: './seace-inbox.component.html',
    styleUrls: ['./seace-inbox.component.sass']
})
export class SeaceInboxComponent implements OnInit {

    constructor(
        private readonly seaceService: SeaceService,
        private readonly navigationService: NavigationService,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly authService: AuthService,
        private readonly matDialog: MatDialog,
    ) { }

    public formGroup: UntypedFormGroup = this.formBuilder.group({
        statusCode: '',
        estado: '',
        objetoContratacion: '',
    });
    public displayedColumns: string[] = ['buenaPro', 'momenclatura', 'objetoContratacion', 'estado', 'valorReferencial', 'status', 'managementDate', 'observations', 'actions'];
    public dataSource: any[] = [];
    public length: number = 0;
    public pageSize: number = 10;
    public pageSizeOptions: number[] = [10, 30, 50];
    public pageIndex: number = 0;
    public key: string = '';
    public user: UserModel | null = null;
    public estados: any[] = [
        { _id: 'Consentido' },
        { _id: 'Nulo' },
        { _id: 'Adjudicado' },
        { _id: 'Desierto' },
        { _id: 'Convocado' }
    ]

    public departamentos: string[] = [
        'AMAZONAS',
        'ANCASH',
        'APURIMAC',
        'AREQUIPA',
        'AYACUCHO',
        'CAJAMARCA',
        'CALLAO',
        'CUSCO',
        'EXTERIOR',
        'HUANCAVELICA',
        'HUANUCO',
        'ICA',
        'JUNIN',
        'LA LIBERTAD',
        'LAMBAYEQUE',
        'LIMA', // 15
        'LORETO',
        'MADRE DE DIOS',
        'MOQUEGUA',
        'MULTIDEPARTAMENTAL',
        'PASCO',
        'PIURA',
        'PUNO',
        'SAN MARTIN',
        'TACNA',
        'TUMBES',
        'UCAYALI'
    ]
    private params: Params = {};

    private queryParams$: Subscription = new Subscription();
    private handleSearch$: Subscription = new Subscription();
    private handleClickMenu$: Subscription = new Subscription();
    private handleAuth$: Subscription = new Subscription();

    ngOnDestroy() {
        this.queryParams$.unsubscribe();
        this.handleSearch$.unsubscribe();
        this.handleClickMenu$.unsubscribe();
        this.handleAuth$.unsubscribe();
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Buzon Seace');

        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true },
            { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false },
        ]);

        this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
            this.navigationService.loadBarStart();
            this.seaceService.getSeaceDatasByKey(key, this.params).subscribe(seaceDatas => {
                this.navigationService.loadBarFinish();
                this.dataSource = seaceDatas;
            }, (error: HttpErrorResponse) => {
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage(error.error.message);
            });
        });

        this.queryParams$ = this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
            const { startDate, endDate, estado, statusCode, departamento, objetoContratacion, key } = params;

            Object.assign(this.params, {
                estado: estado || '',
                departamento: departamento || '',
                objetoContratacion: objetoContratacion || '',
                statusCode: statusCode || ''
            });

            if (startDate && endDate) {
                this.formGroup.patchValue({
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                });
            }

            this.formGroup.patchValue({
                key: key || '',
                estado: estado || '',
                departamento: departamento || '',
                objetoContratacion: objetoContratacion || '',
                statusCode: statusCode || ''
            });

            this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
                this.user = auth.user;
                Object.assign(this.params, { workerId: this.user.workerId });
                this.fetchData();
                this.fetchCount();
            });

        });

        this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
            this.navigationService.loadBarStart();
            const chunk = 500;
            const promises: Promise<any>[] = [];

            for (let index = 0; index < this.length / chunk; index++) {
                const promise = this.seaceService.getSeaceDatasByPage(index + 1, chunk, this.params).toPromise();
                promises.push(promise);
            }

            Promise.all(promises).then(values => {
                this.navigationService.loadBarFinish();
                const seaceDatas: SeaceDataModel[] = values.flat();
                const wscols = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
                let body = [];
                body.push([
                    'CONVOCATORIA',
                    'BUENA PRO',
                    'MOMENCLATURA',
                    'OBJETO DE CONTRATACION',
                    'ESTADO',
                    'VALOR REFERENCIAL',
                    'PERSONAL',
                    'OBSERVACIONES'
                ]);
                for (const seaceData of seaceDatas) {
                    body.push([
                        seaceData.convocatoriaDate ? formatDate(seaceData.convocatoriaDate, 'dd/MM/yyyy', 'en-US') : null,
                        formatDate(seaceData.buenaProDate, 'dd/MM/yyyy', 'en-US'),
                        seaceData.momenclatura,
                        seaceData.objetoContratacion,
                        seaceData.estado,
                        seaceData.valorReferencial,
                        seaceData.worker ? seaceData.worker.name : null,
                        seaceData.observations
                    ]);
                }
                const name = `SEACE_DATA_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
                buildExcel(body, name, wscols, [], []);
            });

        });
    }

    onStatusChange() {
        this.pageIndex = 0;

        const { statusCode, estado, objetoContratacion } = this.formGroup.value;

        const queryParams: Params = { statusCode, estado, objetoContratacion, pageIndex: 0 };

        Object.assign(this.params, queryParams);

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        });

        this.fetchCount();
        this.fetchData();
    }

    onClickCopy() {
        this.navigationService.showMessage('Copiado al portapapeles');
    }

    onDialogOffers(seaceData: SeaceDataModel) {
        this.matDialog.open(DialogOffersComponent, {
            width: '100vw',
            height: '90vh',
            position: { top: '20px' },
            data: seaceData,
        });
    }

    onDialogEditSeaceInbox(seaceData: SeaceDataModel) {
        const dialogRef = this.matDialog.open(DialogEditSeaceInboxComponent, {
            width: '600px',
            position: { top: '20px' },
            data: seaceData,
        });

        dialogRef.afterClosed().subscribe(ok => {
            if (ok) {
                this.fetchData();
            }
        });
    }

    fetchCount() {
        if (this.user && this.user.workerId) {
            this.seaceService.getCountSeaceDatas(this.params).subscribe(count => {
                this.length = count;
            });
        }
    }

    fetchData() {
        if (this.user && this.user.workerId) {
            this.navigationService.loadBarStart();
            this.seaceService.getSeaceDatasByPage(this.pageIndex + 1, this.pageSize, this.params).subscribe(seaceDatas => {
                this.navigationService.loadBarFinish();
                this.dataSource = seaceDatas;
            }, (error: HttpErrorResponse) => {
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage(error.error.message);
            });
        } else {
            alert('Es necesario tener un personal asignado');
        }
    }

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;

        const queryParams = { pageIndex: this.pageIndex, pageSize: this.pageSize };

        Object.assign(this.params, queryParams);

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        });

        this.fetchData();
    }

    onStateChange() {
        this.pageIndex = 0;

        const { estado, objetoContratacion, statusCode } = this.formGroup.value;

        const queryParams: Params = { estado, objetoContratacion, statusCode, pageIndex: 0 };

        Object.assign(this.params, queryParams);

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        });

        this.fetchCount();
        this.fetchData();
    }

    onDialogDetails(seaceData: any) {
        this.matDialog.open(DialogSeaceDetailsComponent, {
            data: seaceData,
            width: '600px',
            position: { top: '20px' }
        });
    }

    onDialogBase(seaceData: any) {
        this.matDialog.open(DialogBaseComponent, {
            width: '100vw',
            height: '90vh',
            position: { top: '20px' },
            data: seaceData,
        });
    }

}
