import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ConstructionModel } from '../construction.model';
import { ConstructionsService } from '../constructions.service';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables);

@Component({
  selector: 'app-debtors',
  templateUrl: './debtors.component.html',
  styleUrls: ['./debtors.component.sass']
})
export class DebtorsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly navigationService: NavigationService,
    private readonly constructionsService: ConstructionsService,
  ) { }
    
  @ViewChild('chartDebtor') 
  private chartDebtorViewChild!: ElementRef<HTMLCanvasElement>;
  public chartDebtor: Chart|null = null;

  public displayedColumns: string[] = [ 
    'emitionAt',
    'code',
    'worker',
    'commission',
    'debt',
    'actions' 
  ];
  public formGroup = this.formBuilder.group({
    constructionCode: '',
  });
  public summaries: any[] = [];
  public dataSource: ConstructionModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  ngOnDestroy() {
  }

  ngOnInit() {
    this.navigationService.setTitle("Recaudacion");
  }

  ngAfterViewInit() {
    this.fetchData();
  }

  onRangeChange() {
    this.fetchData();
  }

  fetchData() {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      this.constructionsService.getDebtorConstructions().subscribe(constructions => {
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
            'PENDIENTE',
            'PAGADO'
          ],
          datasets: [
            {
              label: 'Primas',
              data: [
                totalDebt - totalPaid,
                totalDebt
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
                backgroundColor: function(context) {
                  return 'rgba(73, 79, 87, 0.5)'
                  // return context.dataset.backgroundColor;
                },
                borderRadius: 4,
                color: 'white',
                font: {
                  weight: 'bold'
                },
                formatter: function(value) {
                  if (value === 0) {
                    return null;
                  } else {
                    return (Math.round(value)).toLocaleString('en-US', { minimumFractionDigits: 2 });
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

}
