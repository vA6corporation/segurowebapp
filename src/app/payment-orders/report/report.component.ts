import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { BanksService } from 'src/app/banks/banks.service';
import { CompaniesService } from 'src/app/companies/companies.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BankModel } from 'src/app/providers/bank.model';
import { randomColor } from 'src/app/randomColor';
import { ReportsService } from 'src/app/reports/reports.service';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { buildExcel } from 'src/app/xlsx';
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
    private readonly formBuilder: UntypedFormBuilder,
    private readonly navigationService: NavigationService,
    private readonly workersService: WorkersService,
    private readonly companiesService: CompaniesService,
    private readonly banksService: BanksService,
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
  public formGroup = this.formBuilder.group({
    workerId: '',
    bankId: '',
    type: 'SCTR',
    year: new Date().getFullYear(),
    companyId: '',
  });
  public workers: WorkerModel[] = [];
  private expensesSummaries: any[] = [];
  private incomesSummaries: any[] = [];
  public companies: any[] = [];
  public banks: BankModel[] = [];
  
  private handleWorkers$: Subscription = new Subscription();
  private handleCompanies$: Subscription = new Subscription();
  private handleBanks$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleWorkers$.unsubscribe();
    this.handleCompanies$.unsubscribe();
    this.handleBanks$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
  }

  ngOnInit() {
    this.navigationService.setTitle("Resumen");

    this.handleBanks$ = this.banksService.handleBanks().subscribe(banks => {
      this.banks = banks;
    });

    this.handleCompanies$ = this.companiesService.handleCompanies().subscribe(companies => {
      this.companies = companies;
    });

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
      this.navigationService.loadBarStart();
      const promises: Promise<any>[] = [];
      for (const bank of this.banks) {
        const { year } = this.formGroup.value;
        const params = { bankId: bank._id };
        const promise = this.reportsService.getCommissionsByYear(year, params).toPromise();
        promises.push(promise);
      }
      Promise.all(promises).then(values => {
        this.navigationService.loadBarFinish();
        const wscols = [ 40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
        let body = [];
        
        for (let indexBank = 0; indexBank < this.banks.length; indexBank++) {
          const bank = this.banks[indexBank];
          const element = values[indexBank];

          body.push([`${bank.bankName} ${bank.accountNumber}`, '', '', '']);
          body.push([
            'MES',
            'EGRESOS',
            'INGRESOS',
            'DIFERENCIA',
          ]);

          for (let index = 0; index < 12; index++) {
            const incomes = (element[index].guaranties || 0) + (element[index].credits || 0) + (element[index].constructions || 0);
            const expenses = (element[index].totalCharge || 0);
            body.push([
              this.months[index],
              incomes,
              expenses,
              incomes - expenses
            ]);
          }

          body.push(['', '', '', '']);
          body.push(['', '', '', '']);
        }
        const name = `RESUMEN_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
        buildExcel(body, name, wscols, [], []);
      });
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

      const { year, workerId, companyId, bankId } = this.formGroup.value;
      const params = { workerId, companyId, bankId };
      this.navigationService.loadBarStart();

      this.reportsService.getCommissionsByYear(year, params).subscribe(incomesSummaries => {
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
