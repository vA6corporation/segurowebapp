import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Chart, ChartOptions, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { randomColor } from 'src/app/randomColor';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { InsurancesService } from '../insurances.service';

@Component({
  selector: 'app-report-pie',
  templateUrl: './report-pie.component.html',
  styleUrls: ['./report-pie.component.sass']
})
export class ReportPieComponent implements OnInit {

  constructor(
    private readonly insurancesService: InsurancesService,
    private readonly formBuilder: FormBuilder,
    private readonly navigationService: NavigationService,
    private readonly workersService: WorkersService,
  ) { }
    
  @ViewChild('insurancesChart') 
  private insurancesChart!: ElementRef<HTMLCanvasElement>;

  public chartInsurance: Chart|null = null;
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

  private workers$: Subscription = new Subscription();
  public workers: WorkerModel[] = [];
  public summaries: any[] = [];

  ngOnDestroy() {
    this.workers$.unsubscribe();
  }

  ngOnInit() {
    this.navigationService.setTitle("Seguros");

    const startYear = 2020;
    const currentYear = new Date().getFullYear();

    for (let index = startYear; index <= currentYear; index++) {
      this.years.push(index);
    }

    this.navigationService.setMenu([
      // { id: 'search', label: 'Buscar', icon: 'search', show: true },
      { id: 'excel_simple', label: 'Exportar Excel', icon: 'file_download', show: false },
    ]);

    this.workers$ = this.workersService.getWorkers().subscribe(workers => {
      this.workers = workers;
    });

  }

  ngAfterViewInit() {
    this.fetchData();
  }

  fetchData() {
    if (this.formGroup.valid) {
      const { year, type, workerId } = this.formGroup.value;
      const params = { workerId };
      this.navigationService.loadBarStart();
      this.insurancesService.getSummary(
        year,
        type,
        params
      ).subscribe(summaries => {
        this.navigationService.loadBarFinish();
        const colors = [
          randomColor(), 
          randomColor(), 
          randomColor(),
        ];
        this.summaries = summaries;
        this.chartInsurance?.destroy();
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
              label: 'Primas',
              data: summaries.map(e => e.totalPrima),
              backgroundColor: colors[1],
              // fill: true
            },
            {
              label: 'Comisiones',
              data: summaries.map(e => e.totalCommission),
              backgroundColor: colors[2],
              // fill: true
            },
          ]
        };
        // const dataCommission = {
        //   datasets: [
        //     {
        //       label: 'Dataset 1',
        //       data: summaries.map(e => e.totalCommission),
        //       backgroundColor: colors,
        //       fill: true
        //     },
        //   ]
        // };
        const configPrima = {
          type: 'bar' as ChartType,
          // labels: ['Ene', 'Feb'],
          data: dataSet,
          options: {
            maintainAspectRatio: false,
          } as ChartOptions,
        };
        const canvasPrima = this.insurancesChart.nativeElement;
        this.chartInsurance = new Chart(canvasPrima, configPrima);
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
        this.navigationService.loadBarFinish();
      });
    }
  }

}
