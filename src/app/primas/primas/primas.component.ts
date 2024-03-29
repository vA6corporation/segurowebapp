import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Params } from '@angular/router';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Subscription } from 'rxjs';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { randomColor } from 'src/app/randomColor';
import { ReportsService } from 'src/app/reports/reports.service';
import { UserModel } from 'src/app/users/user.model';
import { UsersService } from 'src/app/users/users.service';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { buildExcel } from 'src/app/xlsx';
Chart.register(...registerables);

@Component({
  selector: 'app-primas',
  templateUrl: './primas.component.html',
  styleUrls: ['./primas.component.sass']
})
export class PrimasComponent implements OnInit {

  constructor(
    private readonly reportsService: ReportsService,
    private readonly usersService: UsersService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly workersService: WorkersService,
  ) { }
    
  @ViewChild('collectionChartPrice') 
  private collectionChartPrice!: ElementRef<HTMLCanvasElement>;

  @ViewChild('collectionChartPrima') 
  private collectionChartPrima!: ElementRef<HTMLCanvasElement>;

  public chartPayed: Chart|null = null;
  public chartNotPayed: Chart|null = null;

  public financierForm = this.formBuilder.group({
    name: [ null, Validators.required ],
    _id: [ null, Validators.required ],
  });

  public businessForm = this.formBuilder.group({
    name: [ null, Validators.required ],
    _id: [ null, Validators.required ],
  });
  
  public formGroup = this.formBuilder.group({
    workerId: '',
    startDate: [ new Date(), Validators.required ],
    endDate: [ new Date(), Validators.required ],
  });

  public users: UserModel[] = [];
  public workers: WorkerModel[] = [];
  public compliancePayed: number = 0;
  public materialPayed: number = 0;
  public directPayed: number = 0;
  
  public complianceNotPayed: number = 0;
  public materialNotPayed: number = 0;
  public directNotPayed: number = 0;
  
  public emitionCount: number = 0;
  public renovationCount: number = 0;
  public isEmition: boolean|null = null;
  public total: number = 0;
  
  private guaranties: string[] = ["GFCF", "GADF", "GAMF"];

  private users$: Subscription = new Subscription();
  private handleWorkers$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();
  
  ngOnDestroy() {
    this.users$.unsubscribe();
    this.handleWorkers$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
  }

  ngOnInit() {
    this.navigationService.setTitle("Primas");

    this.navigationService.setMenu([
      // { id: 'search', label: 'Buscar', icon: 'search', show: true },
      { id: 'excel_simple', label: 'Exportar Excel', icon: 'file_download', show: false },
    ]);

    this.users$ = this.usersService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
      this.workers = workers;
    });

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      switch (id) {
        case 'excel_simple':
          if (this.formGroup.valid) {
            this.navigationService.loadBarStart();
            const { startDate, endDate, workerId } = this.formGroup.value;
      
            const params: Params = {
              startDate, endDate, workerId,
            };
      
            if (this.financierForm.valid) {
              params.financierId = this.financierForm.value._id;
            }
      
            if (this.businessForm.valid) {
              params.businessId = this.businessForm.value._id;
            }
      
            params.isEmition = this.isEmition;
            
            this.reportsService.getPrimasByRangeDateWorker(
              params
            ).subscribe(collection => {
              console.log(collection);
              const { payedDirect, notPayedDirect, payedCompliance, notPayedCompliance, payedMaterial, notPayedMaterial } = collection;
              this.navigationService.loadBarFinish();
              const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
              let body = [];
              body.push([
                'GARANTIA',
                'FINANCIERA',
                'CONSORCIO',
                'CLIENTE',
                'N° DE POLIZA',
                'SUMA ASEGURADA',
                'PRIMA',
                'PAGADO',
                'E. DE TRAMITE',
                'E. DE REVISION',
                'F. CUMPLIMIENTO',
                'F. INICIO',
                'OBRA'
              ]);

              if (payedDirect) {
                for (const guarantee of payedDirect) {
                  const { business, partnership, financier } = guarantee;
                  body.push([
                    guarantee.guaranteeType,
                    financier?.name || null,
                    partnership?.name || null,
                    business?.name || null,
                    guarantee.policyNumber,
                    guarantee.price,
                    guarantee.prima,
                    'PAGADO',
                    guarantee.processStatus,
                    guarantee.statusLabel,
                    formatDate(guarantee.endDate, 'dd/MM/yyyy', 'en-US'),
                    formatDate(guarantee.startDate, 'dd/MM/yyyy', 'en-US'),
                    guarantee.construction?.object
                  ]);
                }
              }


              if (notPayedDirect) {
                for (const guarantee of notPayedDirect) {
                  const { business, partnership, financier } = guarantee;
                  body.push([
                    guarantee.guaranteeType,
                    financier?.name || null,
                    partnership?.name || null,
                    business?.name || null,
                    guarantee.policyNumber,
                    guarantee.price,
                    guarantee.prima,
                    'NO PAGADO',
                    guarantee.processStatus,
                    guarantee.statusLabel,
                    formatDate(guarantee.endDate, 'dd/MM/yyyy', 'en-US'),
                    formatDate(guarantee.startDate, 'dd/MM/yyyy', 'en-US'),
                    guarantee.construction?.object
                  ]);
                }
              }

              if (payedCompliance) {
                for (const guarantee of payedCompliance) {
                  const { business, partnership, financier } = guarantee;
                  body.push([
                    guarantee.guaranteeType,
                    financier?.name || null,
                    partnership?.name || null,
                    business?.name || null,
                    guarantee.policyNumber,
                    guarantee.price,
                    guarantee.prima,
                    'PAGADO',
                    guarantee.processStatus,
                    guarantee.statusLabel,
                    formatDate(guarantee.endDate, 'dd/MM/yyyy', 'en-US'),
                    formatDate(guarantee.startDate, 'dd/MM/yyyy', 'en-US'),
                    guarantee.construction?.object
                  ]);
                }
              }

              if (notPayedCompliance) {
                for (const guarantee of notPayedCompliance) {
                  const { business, partnership, financier } = guarantee;
                  body.push([
                    guarantee.guaranteeType,
                    financier?.name || null,
                    partnership?.name || null,
                    business?.name || null,
                    guarantee.policyNumber,
                    guarantee.price,
                    guarantee.prima,
                    'NO PAGADO',
                    guarantee.processStatus,
                    guarantee.statusLabel,
                    formatDate(guarantee.endDate, 'dd/MM/yyyy', 'en-US'),
                    formatDate(guarantee.startDate, 'dd/MM/yyyy', 'en-US'),
                    guarantee.construction?.object
                  ]);
                }
              }

              if (payedMaterial) {
                for (const guarantee of payedMaterial) {
                  const { business, partnership, financier } = guarantee;
                  body.push([
                    guarantee.guaranteeType,
                    financier?.name || null,
                    partnership?.name || null,
                    business?.name || null,
                    guarantee.policyNumber,
                    guarantee.price,
                    guarantee.prima,
                    'PAGADO',
                    guarantee.processStatus,
                    guarantee.statusLabel,
                    formatDate(guarantee.endDate, 'dd/MM/yyyy', 'en-US'),
                    formatDate(guarantee.startDate, 'dd/MM/yyyy', 'en-US'),
                    guarantee.construction?.object
                  ]);
                }
              }
              
              if (notPayedMaterial) {
                for (const guarantee of notPayedMaterial) {
                  const { business, partnership, financier } = guarantee;
                  body.push([
                    guarantee.guaranteeType,
                    financier?.name || null,
                    partnership?.name || null,
                    business?.name || null,
                    guarantee.policyNumber,
                    guarantee.price,
                    guarantee.prima,
                    'NO PAGADO',
                    guarantee.processStatus,
                    guarantee.statusLabel,
                    formatDate(guarantee.endDate, 'dd/MM/yyyy', 'en-US'),
                    formatDate(guarantee.startDate, 'dd/MM/yyyy', 'en-US'),
                    guarantee.construction?.object
                  ]);
                }
              }
              const name = `PRIMAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
              buildExcel(body, name, wscols, [], []);
            });
          }
          break;
      
        default:
          break;
      }
    });
  }

  onSetEmition(isEmition: boolean) {
    this.isEmition = isEmition;
    this.fetchData();
  }

  openDialogFinanciers() {
    const dialogRef = this.matDialog.open(DialogFinanciesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(financier => {
      if (financier) {
        this.financierForm.patchValue(financier);
      } else {
        this.financierForm.patchValue({ name: null, _id: null });
      }
      this.fetchData();
    });
  }

  openDialogBusinesses() {
    const dialogRef = this.matDialog.open(DialogBusinessesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(business => {
      if (business) {
        this.businessForm.patchValue(business);
      } else {
        this.businessForm.patchValue({ name: null, _id: null });
      }
      this.fetchData();
    });
  }

  ngAfterViewInit() {
    this.fetchData();
  }

  fetchData() {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const { startDate, endDate, workerId } = this.formGroup.value;

      const params: Params = {
        startDate, endDate, workerId,
      };

      if (this.financierForm.valid) {
        params.financierId = this.financierForm.value._id;
      }

      if (this.businessForm.valid) {
        params.businessId = this.businessForm.value._id;
      }

      params.isEmition = this.isEmition;
      
      this.reportsService.getSummaryPrimasByRangeDateWorker(
        params
      ).subscribe(collection => {
        console.log(collection);
        this.navigationService.loadBarFinish();
        const { payedCompliance, payedMaterial, payedDirect, notPayedCompliance, notPayedMaterial, notPayedDirect } = collection;
        const colors = [randomColor(), randomColor(), randomColor()];

        this.emitionCount = 
          payedMaterial.emitionCount + 
          notPayedMaterial.emitionCount + 
          
          payedDirect.emitionCount + 
          notPayedDirect.emitionCount + 

          payedCompliance.emitionCount + 
          notPayedCompliance.emitionCount;

        this.renovationCount = 
          payedMaterial.renovationCount + 
          notPayedMaterial.renovationCount +

          payedDirect.renovationCount + 
          notPayedDirect.renovationCount + 

          payedCompliance.renovationCount + 
          notPayedCompliance.renovationCount;

        this.chartPayed?.destroy();

        this.compliancePayed = payedCompliance.emitionPrima + payedCompliance.renovationPrima;
        this.directPayed = payedDirect.emitionPrima + payedDirect.renovationPrima;
        this.materialPayed = payedMaterial.emitionPrima + payedMaterial.renovationPrima;

        const dataPrice = {
          datasets: [
            {
              label: 'Dataset 1',
              data: [this.compliancePayed, this.directPayed, this.materialPayed],
              backgroundColor: colors,
              fill: true
            },
          ]
        };
    
        const configPrice = {
          type: 'pie' as ChartType,
          data: dataPrice,
          plugins: [ChartDataLabels],
          options: {
            maintainAspectRatio: false,
            plugins: {
              datalabels: {
                backgroundColor: function(ctx) {
                  return 'rgba(73, 79, 87, 0.5)'
                },
                borderRadius: 4,
                color: 'white',
                font: {
                  weight: 'bold'
                },
                formatter: (value, ctx) => {
                  if (value) {
                    return this.guaranties[ctx.dataIndex];
                  } else {
                    return null;
                  }
                },
                padding: 6
              },
            }
          } as ChartOptions,
        };
        const canvasPrice = this.collectionChartPrice.nativeElement;
        this.chartPayed = new Chart(canvasPrice, configPrice);
        
        this.chartNotPayed?.destroy();

        this.complianceNotPayed = notPayedCompliance.emitionPrima + notPayedCompliance.renovationPrima;
        this.directNotPayed = notPayedDirect.emitionPrima + notPayedDirect.renovationPrima;
        this.materialNotPayed = notPayedMaterial.emitionPrima + notPayedMaterial.renovationPrima;

        this.total = this.compliancePayed + this.directPayed + this.materialPayed
          + this.complianceNotPayed + this.directNotPayed + this.materialNotPayed;

        const dataPrima = {
          datasets: [
            {
              label: 'Dataset 1',
              data: [this.complianceNotPayed, this.directNotPayed, this.materialNotPayed],
              backgroundColor: colors,
              fill: true
            },
          ]
        };
    
        const configPrima = {
          type: 'pie' as ChartType,
          data: dataPrima,
          plugins: [ChartDataLabels],
          options: {
            maintainAspectRatio: false,
            plugins: {
              datalabels: {
                backgroundColor: function(ctx) {
                  return 'rgba(73, 79, 87, 0.5)'
                },
                borderRadius: 4,
                color: 'white',
                font: {
                  weight: 'bold'
                },
                formatter: (value, ctx) => {
                  if (value) {
                    return this.guaranties[ctx.dataIndex];
                  } else {
                    return null;
                  }
                },
                padding: 6
              },
            }
          } as ChartOptions,
        };
        const canvasPrima = this.collectionChartPrima.nativeElement;
        this.chartNotPayed = new Chart(canvasPrima, configPrima);
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
        this.navigationService.loadBarFinish();
      });
    }
  }

  onChangeCategory() {
    this.fetchData();
  }

  onChangeWorker() {
    this.fetchData();
  }

  onRangeChange() {
    this.fetchData();
  }

  onChange() {
    this.fetchData();
  }

}
