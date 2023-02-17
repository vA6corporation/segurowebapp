import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { randomColor } from 'src/app/randomColor';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { InsurancesService } from '../insurances.service';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { buildExcel } from 'src/app/xlsx';
import { formatDate } from '@angular/common';
import { Params } from '@angular/router';
Chart.register(...registerables);

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass']
})
export class ReportComponent implements OnInit {

  constructor(
    private readonly insurancesService: InsurancesService,
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
  
  private handleWorkers$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleWorkers$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
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

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      switch (id) {
        case 'excel_simple':
          const { year, workerId } = this.formGroup.value;
          const startDate = new Date(year, 0, 1);
          const endDate = new Date(year, 0, 1);
          endDate.setFullYear(endDate.getFullYear() + 1);
          const params: Params = { workerId };
          this.insurancesService.getInsurancesByRangeDateTypeWorker(startDate, endDate, params).subscribe(insurances => {
            const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
            let body = [];
            body.push([
              'CONSORCIO',
              'CLIENTE',
              'N° POLIZA',
              'OBJETO',
              'F. DE EMISION',
              'F. DE VENCIMIENTO',
              'PRIMA',
              'COMISION',
              'ESTADO DE PAGO',
              'PROMOTOR'
            ]);
            for (const insurance of insurances) {
              body.push([
                insurance.partnership?.name.toUpperCase(),
                insurance.business.name.toUpperCase(),
                insurance.policyNumber,
                insurance.construction?.object,
                formatDate(insurance.emitionAt, 'dd/MM/yyyy', 'en-US'),
                formatDate(insurance.expirationAt, 'dd/MM/yyyy', 'en-US'),
                insurance.prima,
                insurance.commission,
                insurance.isPaid ? 'PAGADO' : 'PENDIENTE',
                insurance.worker?.name.toUpperCase(),
              ]);
            }
            const name = `SEGUROS_DESDE_${formatDate(startDate, 'dd/MM/yyyy', 'en-US')}_HASTA_${formatDate(endDate, 'dd/MM/yyyy', 'en-US')}`;
            buildExcel(body, name, wscols, [], []);
          });
          break;
      
        default:
          break;
      }
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
