import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ConstructionModel } from '../construction.model';
import { ConstructionsService } from '../constructions.service';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { buildExcel } from 'src/app/xlsx';
import { BankModel } from 'src/app/providers/bank.model';
import { BanksService } from 'src/app/banks/banks.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Params } from '@angular/router';
Chart.register(...registerables);

@Component({
    selector: 'app-debtors',
    templateUrl: './debtors.component.html',
    styleUrls: ['./debtors.component.sass']
})
export class DebtorsComponent implements OnInit {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly navigationService: NavigationService,
        private readonly constructionsService: ConstructionsService,
        private readonly banksService: BanksService,
    ) { }

    @ViewChild('chartDebtor')
    private chartDebtorViewChild!: ElementRef<HTMLCanvasElement>;
    chartDebtor: Chart | null = null;
    private params: Params = {};

    displayedColumns: string[] = [
        'emitionAt',
        'code',
        'worker',
        'partnership',
        'business',
        'commission',
        'debt',
        'actions'
    ];
    formGroup = this.formBuilder.group({
        bankId: '',
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
    });
    summaries: any[] = [];
    dataSource: ConstructionModel[] = [];
    length: number = 0;
    pageSize: number = 10;
    pageSizeOptions: number[] = [10, 30, 50];
    pageIndex: number = 0;
    banks: BankModel[] = [];

    private handleClickMenu$: Subscription = new Subscription();
    private handleBanks$: Subscription = new Subscription();

    ngOnDestroy() {
        this.handleClickMenu$.unsubscribe();
        this.handleBanks$.unsubscribe();
    }

    ngOnInit() {
        this.navigationService.setTitle("Recaudacion");

        this.handleBanks$ = this.banksService.handleBanks().subscribe(banks => {
            this.banks = banks;
        });

        this.navigationService.setMenu([
            // { id: 'search', label: 'search', icon: 'search', show: true },
            // { id: 'export_constructions_date', label: 'Exportar excel por fecha', icon: 'download', show: false },
            // { id: 'export_constructions_office', label: 'Exportar excel por oficina', icon: 'download', show: false },
            { id: 'export_constructions', label: 'Exportar excel', icon: 'download', show: false },
        ]);

        this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
            const wscols = [40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
            let body = [];
            body.push([
                'F. EMISION',
                'CODIGO',
                'ESTADO DE O.',
                'CLIENTE',
                'CONSORCIO',
                'PERSONAL',
                'HONORARIOS',
                'PENDIENTE',
                'OBSERVACIONES',
                'OBJETO',
            ]);
            for (const construction of this.dataSource) {
                body.push([
                    formatDate(new Date(construction.emitionAt), 'dd/MM/yyyy', 'en-US'),
                    construction.code,
                    construction.constructionCodeType,
                    construction.business.name,
                    construction.partnership?.name,
                    construction.worker?.name,
                    construction.commission,
                    construction.debt,
                    construction.observationsPayment,
                    construction.object,
                ]);
            }
            const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
            buildExcel(body, name, wscols, [], []);
        });

        this.fetchData();
    }

    ngAfterViewInit() {
        this.fetchData();
    }

    onRangeChange() {
        if (this.formGroup.valid) {
            const { startDate, endDate } = this.formGroup.value;
            Object.assign(this.params, { startDate, endDate });
            this.fetchData();
        }
    }

    onChangeBank() {
        const { bankId } = this.formGroup.value;
        Object.assign(this.params, { bankId });
        this.fetchData();
    }

    fetchData() {
        this.navigationService.loadBarStart();
        this.constructionsService.getDebtorConstructions(this.params).subscribe(constructions => {
            this.dataSource = constructions;
            this.navigationService.loadBarFinish();
            let totalPaid = 0;
            let totalDebt = 0;
            for (const construction of constructions) {
                const payments = construction.payments;
                totalDebt += construction.commission;
                totalPaid += payments.map((e: any) => e.charge).reduce((a: number, b: number) => a + b, 0);
            }
            const colors = [
                '#00ff00',
                '#ff0000',
            ];
            this.chartDebtor?.destroy();
            const dataSet = {
                labels: [
                    'PAGADO',
                    'PENDIENTE',
                ],
                datasets: [
                    {
                        label: 'Primas',
                        data: [
                            totalPaid,
                            totalDebt - totalPaid,
                        ],
                        backgroundColor: colors,
                    },
                ]
            };
            const configPrima = {
                type: 'pie' as ChartType,
                data: dataSet,
                plugins: [ChartDataLabels],
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        datalabels: {
                            backgroundColor: function (context) {
                                return 'rgba(73, 79, 87, 0.5)'
                                // return context.dataset.backgroundColor;
                            },
                            borderRadius: 4,
                            color: 'white',
                            font: {
                                weight: 'bold'
                            },
                            formatter: function (value) {
                                if (value === 0) {
                                    return null;
                                } else {
                                    return (Math.round(value)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                }
                            },
                            padding: 6
                        },
                    }
                } as ChartOptions,
            };
            const canvasPrima = this.chartDebtorViewChild.nativeElement;
            this.chartDebtor = new Chart(canvasPrima, configPrima);
        }, (error: HttpErrorResponse) => {
            this.navigationService.showMessage(error.error.message);
            this.navigationService.loadBarFinish();
        });
    }

}
