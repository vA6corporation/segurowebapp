import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { randomColor } from 'src/app/randomColor';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { HttpErrorResponse } from '@angular/common/http';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { CreditsService } from '../credits.service';
import { buildExcel } from 'src/app/xlsx';
Chart.register(...registerables);

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass']
})
export class ReportComponent implements OnInit {

  constructor(
    private readonly creditsService: CreditsService,
    private readonly formBuilder: FormBuilder,
    private readonly navigationService: NavigationService,
    private readonly workersService: WorkersService,
    private readonly matDialog: MatDialog
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
  public workers: WorkerModel[] = [];
  public summaries: any[] = [];
  private months: string[] = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  
  private handleWorkers$: Subscription = new Subscription();
  
  ngOnDestroy() {
    this.handleWorkers$.unsubscribe();
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

    this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
      this.workers = workers;
    });

    this.navigationService.handleClickMenu().subscribe(id => {
      const { year } = this.formGroup.value;
      this.creditsService.getSummaryMonthsByYear(year).subscribe(workers => {
        console.log(workers);
        {
          const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
          let body = [];
          const headerRow = ['PERSONAL', 'ASEGURADORA'];
          this.months.forEach(e => headerRow.push(e.toUpperCase()));
          body.push(headerRow);
          for (const worker of workers) {
            const workerRow = [worker.worker.name.toUpperCase(), worker.financier.name.toUpperCase()];
            worker.months.forEach((e: any) => workerRow.push(e.totalCommission));
            body.push(workerRow);
          }
  
          const name = `COMISIONES`;
          buildExcel(body, name, wscols, [], []);
        }
        {
          const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
          let body = [];
          const headerRow = ['PERSONAL', 'ASEGURADORA'];
          this.months.forEach(e => headerRow.push(e.toUpperCase()));
          body.push(headerRow);
          for (const worker of workers) {
            const workerRow = [worker.worker.name.toUpperCase(), worker.financier.name.toUpperCase()];
            worker.months.forEach((e: any) => workerRow.push(e.totalPrima));
            body.push(workerRow);
          }
  
          const name = `PRIMAS`;
          buildExcel(body, name, wscols, [], []);

        }
      });
    });
  }

  ngAfterViewInit() {
    this.fetchData();
  }

  fetchData() {
    if (this.formGroup.valid) {
      const { year, workerId } = this.formGroup.value;
      const params = { workerId };
      this.navigationService.loadBarStart();
      this.creditsService.getSummaryByYear(
        year,
        params
      ).subscribe(summaries => {

        console.log(summaries);

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
              data: summaries.map((e: any) => e.totalPrima),
              backgroundColor: colors[1],
              // fill: true
            },
            {
              label: 'Comisiones',
              data: summaries.map((e: any) => e.totalCommission),
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
