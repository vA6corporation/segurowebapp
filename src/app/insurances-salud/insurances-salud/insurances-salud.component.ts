import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, lastValueFrom } from 'rxjs';
import { InsuranceModel } from 'src/app/insurances/insurance.model';
import { DialogMaterialComponent } from 'src/app/materials/dialog-material/dialog-material.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { buildExcel } from 'src/app/xlsx';
import { InsurancesSaludService } from '../insurances-salud.service';

@Component({
  selector: 'app-insurances-salud',
  templateUrl: './insurances-salud.component.html',
  styleUrl: './insurances-salud.component.sass'
})
export class InsurancesSaludComponent {

    constructor(
        private readonly navigationService: NavigationService,
        private readonly insurancesSaludService: InsurancesSaludService,
        private readonly workersService: WorkersService,
        private readonly matDialog: MatDialog,
        private readonly formBuilder: UntypedFormBuilder
    ) { }

    public formGroup: UntypedFormGroup = this.formBuilder.group({
        workerId: '',
        startDate: '',
        endDate: '',
    });
    public displayedColumns: string[] = [
        'partnership', 
        'business', 
        'financier', 
        'policyNumber', 
        'emitionAt', 
        'expirationAt', 
        'prima', 
        'observations',
        'actions',
    ];
    public dataSource: InsuranceModel[] = [];
    public length: number = 0;
    public pageSize: number = 10;
    public pageSizeOptions: number[] = [10, 30, 50];
    public pageIndex: number = 0;
    public type: string = '';
    public workers: WorkerModel[] = [];

    private handleWorkers$: Subscription = new Subscription();
    private handleSearch$: Subscription = new Subscription();
    private handleClickMenu$: Subscription = new Subscription();

    ngOnDestroy() {
        this.handleWorkers$.unsubscribe();
        this.handleSearch$.unsubscribe();
        this.handleClickMenu$.unsubscribe();
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Salud');

        this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
            this.workers = workers;
        });

        this.navigationService.setMenu([
            { id: 'search', label: 'search', icon: 'search', show: true },
            { id: 'export_excel', label: 'Exportar excel', icon: 'download', show: false }
        ]);
        
        this.fetchData();


        this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
            this.navigationService.loadBarStart();
            this.insurancesSaludService.getInsurancesSaludByKey(key).subscribe(insurances => {
                this.navigationService.loadBarFinish();
                this.dataSource = insurances;
            }, (error: HttpErrorResponse) => {
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage(error.error.message);
            });
        });

        this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {

            if (id == 'export_excel') {
                this.navigationService.loadBarStart();
                const { workerId, startDate, endDate } = this.formGroup.value;

                const params: Params = {
                    workerId,
                    startDate,
                    endDate
                };

                const chunk = 500;
                const promises: Promise<any>[] = [];

                for (let index = 0; index < this.length / chunk; index++) {
                    const promise = this.insurancesSaludService.getInsurancesSaludByPage(index + 1, chunk, params).toPromise();
                    promises.push(promise);
                }

                const wscols = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];

                Promise.all(promises).then(values => {
                    this.navigationService.loadBarFinish();
                    const insurances: InsuranceModel[] = values.flat();

                    let body = [];
                    body.push([
                        'N° DE POLIZA',
                        'F. DE EMISION',
                        'F. DE VENCIMIENTO',
                        'CONSORCIO',
                        'EMPRESA',
                        'FINANCIERA',
                        'BROKER',
                        'PRIMA',
                        'COMISION'
                    ]);

                    for (const insurance of insurances) {
                        body.push([
                            insurance.policyNumber,
                            formatDate(new Date(insurance.emitionAt), 'dd/MM/yyyy', 'en-US'),
                            formatDate(new Date(insurance.expirationAt), 'dd/MM/yyyy', 'en-US'),
                            insurance.partnership?.name,
                            insurance.business.name,
                            insurance.financier.name,
                            insurance.worker.name.toUpperCase(),
                            Number(insurance.prima.toFixed(2)),
                            Number(insurance.commission.toFixed(2))
                        ]);
                    }

                    const name = `SEGUROS_${this.type}_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
                    buildExcel(body, name, wscols, [], []);
                });
            }
        });
    }

    handlePageEvent(event: PageEvent): void {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.fetchData();
    }

    onShowDetails(materialId: string) {
        this.matDialog.open(DialogMaterialComponent, {
            position: { top: '20px' },
            data: materialId,
        });
    }

    async onDelete(insuranceId: string) {
        const ok = confirm('Esta seguro de eliminar?...');
        if (ok) {
            this.insurancesSaludService.delete(insuranceId).subscribe(() => {
                this.navigationService.showMessage('Eliminado correctamente');
                this.dataSource = this.dataSource.filter(e => e._id !== insuranceId);
            });
        }
    }

    fetchData() {
        const { workerId, startDate, endDate } = this.formGroup.value;

        const params: Params = {
            workerId,
            startDate,
            endDate
        };

        this.insurancesSaludService.getCountInsurancesSalud( params).subscribe(count => {
            this.length = count;
        });

        this.navigationService.loadBarStart();
        this.insurancesSaludService.getInsurancesSaludByPage(this.pageIndex + 1, this.pageSize, params).subscribe(insurancesSctr => {
            this.navigationService.loadBarFinish();
            console.log(insurancesSctr);
            
            this.dataSource = insurancesSctr;
        });
    }

}
