import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { randomColor } from 'src/app/randomColor';
import { ReportsService } from 'src/app/reports/reports.service';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { PaymentOrdersService } from '../payment-orders.service';
Chart.register(...registerables);

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass']
})
export class ReportComponent implements OnInit {

  constructor(
    private readonly paymentOrdersService: PaymentOrdersService,
    private readonly reportsService: ReportsService,
    private readonly formBuilder: FormBuilder,
    private readonly navigationService: NavigationService,
    private readonly workersService: WorkersService,
    private readonly matDialog: MatDialog
  ) { }
    
  @ViewChild('expensesChart') 
  private expensesChartElement!: ElementRef<HTMLCanvasElement>;

  @ViewChild('incomesChart') 
  private incomesChartElement!: ElementRef<HTMLCanvasElement>;

  @ViewChild('utilitiesChart') 
  private utilitiesChartElement!: ElementRef<HTMLCanvasElement>;

  public expensesChart: Chart|null = null;
  public incomesChart: Chart|null = null;
  public utilitiesChart: Chart|null = null;
  public years: number[] = [];
  public types: string[] = [
    'SCTR',
    'SOAT',
    'VIDALEY',
    'POLIZACAR',
    'POLIZATREC',
    'POLIZAEAR',
    'RCIVIL',
    'VEHICULAR',
    'VIDA',
    'EPS',
    'SALUD',
  ];
  public formGroup = this.formBuilder.group({
    workerId: '',
    type: 'SCTR',
    year: new Date().getFullYear()
  });
  public workers: WorkerModel[] = [];
  private expensesSummaries: any[] = [];
  private incomesSummaries: any[] = [];
  
  private handleWorkers$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleWorkers$.unsubscribe();
  }

  ngOnInit() {
    this.navigationService.setTitle("Resumen");

    const startYear = 2020;
    const currentYear = new Date().getFullYear();

    for (let index = startYear; index <= currentYear; index++) {
      this.years.push(index);
    }

    this.navigationService.setMenu([
      // { id: 'search', label: 'Buscar', icon: 'search', show: true },
      { id: 'excel_simple', label: 'Exportar Excel', icon: 'file_download', show: false },
    ]);

    this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
      this.workers = workers;
    });

  }

  ngAfterViewInit() {
    this.fetchData();
  }

  onUpdateUtilities() {

    if (this.expensesSummaries.length && this.incomesSummaries.length) {
      const utilities = [];
      for (let index = 0; index < 12; index++) {
        const incomes = this.incomesSummaries[index].guaranties + this.incomesSummaries[index].credits + this.incomesSummaries[index].constructions;
        const expenses = this.expensesSummaries[index].totalCharge;
        utilities.push(incomes - expenses);
      }

      const colors = [
        randomColor(), 
        randomColor(), 
        randomColor(),
      ];

      this.utilitiesChart?.destroy();
      
      const dataSet = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [
          // {
          //   label: 'Cantidad',
          //   data: summaries.map(e => e.count),
          //   backgroundColor: colors[0],
          //   // fill: true
          // },
          {
            label: 'Utilidades',
            data: utilities.map((e: any) => e),
            backgroundColor: colors[1],
            // fill: true
          },
          // {
          //   label: 'Comisiones',
          //   data: summaries.map((e: any) => e.totalCommission),
          //   backgroundColor: colors[2],
          //   // fill: true
          // },
        ]
      };
  
      const configPrima = {
        type: 'bar' as ChartType,
        data: dataSet,
        options: {
          maintainAspectRatio: false,
        } as ChartOptions,
      };
      const canvasPrima = this.utilitiesChartElement.nativeElement;
      this.utilitiesChart = new Chart(canvasPrima, configPrima);
    }
  }

  fetchData() {
    if (this.formGroup.valid) {

      const { year, workerId } = this.formGroup.value;
      const params = { workerId };
      this.navigationService.loadBarStart();

      this.reportsService.getCommissionsByYear(year).subscribe(incomesSummaries => {
        this.incomesSummaries = incomesSummaries;
        this.onUpdateUtilities();
        this.navigationService.loadBarFinish();

        const colors = [
          randomColor(), 
          randomColor(), 
          randomColor(),
        ];

        this.incomesChart?.destroy();
        
        const dataSet = {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          datasets: [
            {
              label: 'Comision',
              data: incomesSummaries.map(e => e.guaranties),
              backgroundColor: colors[0],
            },
            {
              label: 'L. de credito',
              data: incomesSummaries.map((e: any) => e.credits),
              backgroundColor: colors[1],
            },
            {
              label: 'Honorarios',
              data: incomesSummaries.map((e: any) => e.constructions),
              backgroundColor: colors[2],
            },
          ]
        };
    
        const config = {
          type: 'bar' as ChartType,
          data: dataSet,
          options: {
            maintainAspectRatio: false,
          } as ChartOptions,
        };
        const canvas = this.incomesChartElement.nativeElement;
        this.incomesChart = new Chart(canvas, config);

      });

      this.paymentOrdersService.getSummaryByYear(
        year,
        params
      ).subscribe(expensesSummaries => {
        this.expensesSummaries = expensesSummaries;
        this.onUpdateUtilities();
        this.navigationService.loadBarFinish();

        const colors = [
          randomColor(), 
          randomColor(), 
          randomColor(),
        ];

        this.expensesChart?.destroy();
        
        const dataSet = {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          datasets: [
            // {
            //   label: 'Cantidad',
            //   data: summaries.map(e => e.count),
            //   backgroundColor: colors[0],
            //   // fill: true
            // },
            {
              label: 'Ordenes de pago',
              data: expensesSummaries.map((e: any) => e.totalCharge),
              backgroundColor: colors[1],
              // fill: true
            },
            // {
            //   label: 'Comisiones',
            //   data: summaries.map((e: any) => e.totalCommission),
            //   backgroundColor: colors[2],
            //   // fill: true
            // },
          ]
        };
    
        const configPrima = {
          type: 'bar' as ChartType,
          data: dataSet,
          options: {
            maintainAspectRatio: false,
          } as ChartOptions,
        };
        const canvasPrima = this.expensesChartElement.nativeElement;
        this.expensesChart = new Chart(canvasPrima, configPrima);
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
        this.navigationService.loadBarFinish();
      });
    }
  }

}
