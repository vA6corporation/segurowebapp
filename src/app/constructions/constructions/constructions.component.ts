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
import { OfficeModel } from 'src/app/auth/office.model';
import { BanksService } from 'src/app/banks/banks.service';
import { buildServiceOrder } from 'src/app/buildServiceOrder';
import { ComplianceModel } from 'src/app/compliances/compliance.model';
import { DirectModel } from 'src/app/directs/direct.model';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { MaterialModel } from 'src/app/materials/material.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { OfficesService } from 'src/app/offices/offices.service';
import { BankModel } from 'src/app/providers/bank.model';
import { UserModel } from 'src/app/users/user.model';
import { buildExcel } from 'src/app/xlsx';
import { ConstructionModel } from '../construction.model';
import { ConstructionsService } from '../constructions.service';
import { DialogAddBailComponent } from '../dialog-add-bail/dialog-add-bail.component';
import { DialogDetailConstructionsComponent } from '../dialog-detail-constructions/dialog-detail-constructions.component';

@Component({
    selector: 'app-constructions',
    templateUrl: './constructions.component.html',
    styleUrls: ['./constructions.component.sass']
})
export class ConstructionsComponent implements OnInit {

    constructor(
        private readonly constructionsService: ConstructionsService,
        private readonly navigationService: NavigationService,
        private readonly matDialog: MatDialog,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly officesService: OfficesService,
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly banksService: BanksService,
    ) { }

    public displayedColumns: string[] = [
        'emitionAt',
        'code',
        'object',
        'worker',
        'office',
        'business',
        'partnership',
        'actions'
    ];
    public dataSource: ConstructionModel[] = [];
    public length: number = 0;
    public pageSize: number = 10;
    public pageSizeOptions: number[] = [10, 30, 50];
    public pageIndex: number = 0;
    public formGroup: UntypedFormGroup = this.formBuilder.group({
        officeId: '',
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
        financier: this.formBuilder.group({
            name: '',
            _id: ''
        }),
    });
    public offices: OfficeModel[] = [];
    private user: UserModel | null = null;
    private banks: BankModel[] = [];
    private key: string | null = null;
    public months: any[] = [
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
    private params: Params = {};

    private handleSearch$: Subscription = new Subscription();
    private handleClickMenu$: Subscription = new Subscription();
    private handleAuth$: Subscription = new Subscription();
    private handleOffices$: Subscription = new Subscription();
    private queryParams$: Subscription = new Subscription();
    private handleBanks$: Subscription = new Subscription();

    ngOnDestroy() {
        this.handleSearch$.unsubscribe();
        this.handleClickMenu$.unsubscribe();
        this.handleAuth$.unsubscribe();
        this.handleOffices$.unsubscribe();
        this.queryParams$.unsubscribe();
        this.handleBanks$.unsubscribe();
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Obras admin');

        this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
            this.user = auth.user;
        });

        this.handleBanks$ = this.banksService.handleBanks().subscribe(banks => {
            this.banks = banks;
        });

        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true },
            { id: 'export_constructions', label: 'Exportar excel', icon: 'download', show: false },
        ]);

        this.handleOffices$ = this.officesService.handleOffices().subscribe(offices => {
            this.offices = offices;
        });

        this.queryParams$ = this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
            const { startDate, endDate, key, pageIndex, pageSize } = params;
            if (pageIndex && pageSize) {
                this.pageIndex = Number(pageIndex);
                this.pageSize = Number(pageSize);
            }
            if (key) {
                this.key = key;
            } else {
                if (startDate && endDate) {
                    this.formGroup.patchValue({
                        startDate: new Date(startDate),
                        endDate: new Date(endDate)
                    });
                    Object.assign(this.params, {
                        startDate: new Date(startDate),
                        endDate: new Date(endDate)
                    });
                }
                this.fetchData();
                this.fetchCount();
            }
        });

        this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
            this.key = key;

            const queryParams: Params = { startDate: null, endDate: null, pageIndex: 0, key };

            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: queryParams,
                queryParamsHandling: 'merge', // remove to replace all query params by provided
            });

            this.fetchData();
            this.fetchCount();

        });

        this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {

            switch (id) {
                case 'export_constructions': {
                    this.navigationService.loadBarStart();
                    const chunk = 500;
                    const promises: Promise<any>[] = [];

                    for (let index = 0; index < this.length / chunk; index++) {
                        const promise = this.constructionsService.getConstructionsByPage(index + 1, chunk, this.params).toPromise();
                        promises.push(promise);
                    }

                    Promise.all(promises).then(values => {
                        this.navigationService.loadBarFinish();
                        const constructions = values.flat();
                        const wscols = [40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
                        let body = [];
                        if (this.user?.isAdmin) {
                            body.push([
                                'ESTADO DE O.',
                                'CLIENTE',
                                'CONSORCIO',
                                'PERSONAL',
                                'A. PROGRAMADO',
                                'A. EJECUTADO',
                                'MES',
                                'AÑO',
                                'GAMF',
                                'GADF',
                                'GFCF',
                                'H. EXONERADO',
                                'HONORARIOS',
                                'H. PAGADO',
                                'H. PENDIENTE',
                                'F.I. DE OBRA',
                                'PLAZO EN DIAS',
                                'F.F. DE OBRA',
                                'OBS. DE PAGOS',
                                'OBSERVACIONES',
                                'FINANCIERA',
                                'OBJETO',
                            ]);
                            for (const construction of constructions) {
                                const payed = construction.payments.map((e: any) => e.charge).reduce((a: any, b: any) => a + b, 0);
                                body.push([
                                    construction.constructionCodeType,
                                    construction.business.name,
                                    construction.partnership?.name,
                                    construction.worker?.name,
                                    construction.percentCompletion?.percentProgrammated,
                                    construction.percentCompletion?.percentCompletion,
                                    construction.percentCompletion?.month ? this.months[construction.percentCompletion?.month] : '',
                                    construction.percentCompletion?.year,
                                    construction.emitionMaterial?.price,
                                    construction.emitionDirect?.price,
                                    construction.emitionCompliance?.price,
                                    construction.isExonerated ? 'SI' : 'NO',
                                    construction.commission,
                                    payed,
                                    construction.commission - payed,
                                    construction.startAt ? formatDate(new Date(construction.startAt), 'dd/MM/yyyy', 'en-US') : null,
                                    construction.dayLimit,
                                    construction.endAt ? formatDate(new Date(construction.endAt), 'dd/MM/yyyy', 'en-US') : null,
                                    construction.observationsPayment,
                                    construction.observations,
                                    [
                                        ...construction.materials.map((e: MaterialModel) => e.financier.name),
                                        ...construction.compliances.map((e: ComplianceModel) => e.financier.name),
                                        ...construction.materials.map((e: DirectModel) => e.financier.name),
                                    ],
                                    construction.object,
                                ]);
                            }
                        } else {
                            body.push([
                                'ESTADO DE O.',
                                'CLIENTE',
                                'CONSORCIO',
                                'PERSONAL',
                                'A. PROGRAMADO',
                                'A. EJECUTADO',
                                'MES',
                                'AÑO',
                                'GAMF',
                                'GADF',
                                'GFCF',
                                'F.I. DE OBRA',
                                'PLAZO EN DIAS',
                                'F.F. DE OBRA',
                                'OBSERVACIONES',
                                'FINANCIERA',
                                'OBJETO',
                            ]);
                            for (const construction of constructions) {
                                const payed = construction.payments.map((e: any) => e.charge).reduce((a: any, b: any) => a + b, 0);
                                body.push([
                                    construction.constructionCodeType,
                                    construction.business.name,
                                    construction.partnership?.name,
                                    construction.worker?.name,
                                    construction.percentCompletion?.percentProgrammated,
                                    construction.percentCompletion?.percentCompletion,
                                    construction.percentCompletion?.month ? this.months[construction.percentCompletion?.month] : '',
                                    construction.percentCompletion?.year,
                                    construction.emitionMaterial?.price,
                                    construction.emitionDirect?.price,
                                    construction.emitionCompliance?.price,
                                    construction.startAt ? formatDate(new Date(construction.startAt), 'dd/MM/yyyy', 'en-US') : null,
                                    construction.dayLimit,
                                    construction.endAt ? formatDate(new Date(construction.endAt), 'dd/MM/yyyy', 'en-US') : null,
                                    construction.observations,
                                    [
                                        ...construction.materials.map((e: MaterialModel) => e.financier.name),
                                        ...construction.compliances.map((e: ComplianceModel) => e.financier.name),
                                        ...construction.materials.map((e: DirectModel) => e.financier.name),
                                    ],
                                    construction.object,
                                ]);
                            }
                        }

                        const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
                        buildExcel(body, name, wscols, [], []);
                    });
                    break;
                }
                case 'export_emitions': {
                    this.navigationService.loadBarStart();
                    this.constructionsService.getEmitions().subscribe(guaranties => {
                        this.navigationService.loadBarFinish();

                        const wscols = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
                        let body = [];
                        body.push([
                            'GARANTIA',
                            'FINANCIERA',
                            'CONSORCIO',
                            'CLIENTE',
                            'N° DE POLIZA',
                            'SUMA ASEGURADA',
                            'PRIMA',
                            'E. DE REVISION',
                            'F. CUMPLIMIENTO',
                            'OBSERVACIONES',
                            'OBJETO'
                        ]);

                        for (const guarantee of guaranties) {
                            const { business, partnership, financier } = guarantee;
                            body.push([
                                guarantee.guaranteeType,
                                financier?.name || null,
                                partnership?.name || null,
                                business?.name || null,
                                guarantee.policyNumber,
                                guarantee.price,
                                guarantee.prima,
                                guarantee.statusLabel,
                                formatDate(guarantee.endDate, 'dd/MM/yyyy', 'en-US'),
                                guarantee.observations,
                                guarantee.construction.object
                            ]);
                        }
                        const name = `RENOVACIONES_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
                        buildExcel(body, name, wscols, [], []);
                    }, (error: HttpErrorResponse) => {
                        this.navigationService.showMessage(error.error.message);
                    });
                    break;
                }
                default:
                    break;
            }

        });
    }

    onDialogFinanciers() {
        const dialogRef = this.matDialog.open(DialogFinanciesComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(financier => {
            if (financier) {
                this.formGroup.patchValue({ financier });
                Object.assign(this.params, { financierId: financier._id });
            } else {
                this.formGroup.patchValue({
                    financier: {
                        name: '',
                        _id: '',
                    }
                });
                Object.assign(this.params, { financierId: '' });
            }
            this.fetchData();
            this.fetchCount();
        });
    }

    async onExportPdf(constructionId: string) {
        this.navigationService.loadBarStart();
        this.constructionsService.getConstructionById(constructionId).subscribe(async construction => {
            this.navigationService.loadBarFinish();
            if (construction.company) {
                const pdf = await buildServiceOrder(construction);
                pdf.save(`ORDEN_DE_SERVICIO_${construction.business.name}.pdf`);
            } else {
                alert('Es necesario asignar la razon social');
            }
        }, (error: HttpErrorResponse) => {
            this.navigationService.loadBarFinish();
        });
    }

    onAddBail(constructionId: string) {
        this.matDialog.open(DialogAddBailComponent, {
            data: constructionId,
            width: '600px',
            position: { top: '20px' }
        });
    }

    onOfficeChange() {
        this.pageIndex = 0;
        this.key = null;
        const { officeId } = this.formGroup.value;
        Object.assign(this.params, { officeId });
        this.fetchData();
        this.fetchCount();
    }

    onRangeChange() {
        if (this.formGroup.valid) {
            this.key = null;
            this.pageIndex = 0;
            const { startDate, endDate } = this.formGroup.value;

            const queryParams: Params = { startDate, endDate, pageIndex: 0, key: null };

            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: queryParams,
                queryParamsHandling: 'merge', // remove to replace all query params by provided
            });

            Object.assign(this.params, queryParams);

            this.fetchData();
            this.fetchCount();
        }
    }

    fetchCount() {
        if (this.key) {
            this.constructionsService.getCountConstructionsByKey(this.params, this.key).subscribe(count => {
                this.length = count;
            });
        } else {
            this.constructionsService.getCountConstructions(this.params).subscribe(count => {
                this.length = count;
            });
        }
    }

    fetchData() {
        this.navigationService.loadBarStart();
        if (this.key) {
            this.constructionsService.getConstructionsByPageKey(this.pageIndex + 1, this.pageSize, this.key, {}).subscribe(constructions => {
                this.navigationService.loadBarFinish();
                this.dataSource = constructions;
            });
        } else {
            this.constructionsService.getConstructionsByPage(
                this.pageIndex + 1,
                this.pageSize,
                this.params
            ).subscribe(constructions => {
                this.navigationService.loadBarFinish();
                this.dataSource = constructions;
                console.log(constructions);
            }, (error: HttpErrorResponse) => {
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage(error.error.message);
            });
        }
    }

    onShowDetails(constructionId: string) {
        this.matDialog.open(DialogDetailConstructionsComponent, {
            width: '100vw',
            // height: '90vh',
            position: { top: '20px' },
            data: constructionId,
        });
    }

    onDelete(constructionId: string) {
        const ok = confirm('Esta seguro de anular?...');
        if (ok) {
            this.navigationService.loadBarStart();
            this.constructionsService.delete(constructionId).subscribe(() => {
                this.navigationService.loadBarFinish();
                this.dataSource = this.dataSource.filter(e => e._id !== constructionId);
            }, (error: HttpErrorResponse) => {
                this.navigationService.showMessage(error.error.message);
                this.navigationService.loadBarFinish();
            });
        }
    }

    handlePageEvent(event: PageEvent): void {
        const { pageIndex, pageSize } = event;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;

        const queryParams: Params = { pageIndex, pageSize };

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        });

        this.fetchData();
    }

}
