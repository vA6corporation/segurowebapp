import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Chart } from 'chart.js';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ConstructionModel } from '../construction.model';
import { ConstructionsService } from '../constructions.service';

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
    
  @ViewChild('debtorsChart') 
  private debtorsChart!: ElementRef<HTMLCanvasElement>;

  public displayedColumns: string[] = [ 
    'emitionAt',
    'code',
    'worker',
    'commission',
    'debt',
    // 'business',
    // 'partnership', 
    'actions' 
  ];
  public chartInsurance: Chart|null = null;
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
      // const { constructionCode } = this.formGroup.value;
      this.navigationService.loadBarStart();
      this.constructionsService.getDebtorConstructions().subscribe(constructions => {
        // console.log(summaries);
        this.dataSource = constructions;
        // this.navigationService.loadBarFinish();
        // const colors = [
        //   '#00ff00',
        //   '#ffff00',
        //   '#ff0000', 
        // ];
        // this.chartInsurance?.destroy();
        // const dataSet = {
        //   labels: [
        //     'BIEN',
        //     'PRECAUCION',
        //     'PELIGRO'
        //   ],
        //   datasets: [
        //     {
        //       label: 'Primas',
        //       data: [
        //         summaries.summaryGood,
        //         summaries.summaryWarning,
        //         summaries.summaryDanger,
        //       ],
        //       backgroundColor: colors,
        //     },
        //   ]
        // };
        // const configPrima = {
        //   type: 'pie' as ChartType,
        //   data: dataSet,
        //   plugins: [ChartDataLabels],
        //   options: {
        //     maintainAspectRatio: false,
        //     plugins: {
        //       datalabels: {
        //         backgroundColor: function(context) {
        //           return 'rgba(73, 79, 87, 0.5)'
        //           // return context.dataset.backgroundColor;
        //         },
        //         borderRadius: 4,
        //         color: 'white',
        //         font: {
        //           weight: 'bold'
        //         },
        //         formatter: function(value) {
        //           if (value === 0) {
        //             return null;
        //           } else {
        //             return Math.round(value);
        //           }
        //         },
        //         padding: 6
        //       },
        //     }
        //   } as ChartOptions,
        // };
        // const canvasPrima = this.insurancesChart.nativeElement;
        // this.chartInsurance = new Chart(canvasPrima, configPrima);
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
        this.navigationService.loadBarFinish();
      });
    }
  }

}
