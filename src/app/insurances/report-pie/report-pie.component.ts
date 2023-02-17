import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { Chart, ChartOptions, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { randomColor } from 'src/app/randomColor';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { buildExcel } from 'src/app/xlsx';
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
    
  @ViewChild('creditsChart') 
  private insurancesChart!: ElementRef<HTMLCanvasElement>;

  public chartInsurance: Chart|null = null;
  public total: number = 0;
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
    type: '',
    startDate: [ new Date(), Validators.required ],
    endDate: [ new Date(), Validators.required ],
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

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      switch (id) {
        case 'excel_simple':
          const { startDate, endDate, workerId } = this.formGroup.value;
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
              'PROMOTOR',
              'TIPO'
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
                insurance.type
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

    this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
      this.workers = workers;
    });
    
  }

  ngAfterViewInit() {
    this.fetchData();
  }

  onRangeChange() {
    if (this.formGroup.valid) {
      this.fetchData();
    }
  }

  fetchData() {
    if (this.formGroup.valid) {
      const { startDate, endDate, type, workerId } = this.formGroup.value;
      const params = { workerId, type };
      this.navigationService.loadBarStart();
      this.insurancesService.getSummaryByRangeDateTypeWorker(
        startDate,
        endDate,
        params
      ).subscribe(summaries => {
        this.navigationService.loadBarFinish();
        const colors = [
          randomColor(), 
          randomColor(), 
          randomColor(),
        ];
        this.summaries = summaries;
        this.total = summaries.map(e => e.totalPrima).reduce((a, b) => a + b, 0);
        this.chartInsurance?.destroy();
        const dataSet = {
          // labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          labels: summaries.map(e => e._id),
          datasets: [
            {
              label: 'Primas',
              data: summaries.map(e => e.totalPrima),
              backgroundColor: colors,
            },
          ]
        };
        const configPrima = {
          type: 'pie' as ChartType,
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
