import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ReportsService } from 'src/app/reports/reports.service';
import { randomColor } from 'src/app/randomColor';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { MatDialog } from '@angular/material/dialog';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { formatDate } from '@angular/common';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { buildExcel } from 'src/app/xlsx';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
Chart.register(...registerables);

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.sass']
})
export class CollectionsComponent implements OnInit {

  constructor(
    private readonly reportsService: ReportsService,
    private readonly workersService: WorkersService,
    private readonly formBuilder: FormBuilder,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
  ) { }
    
  @ViewChild('collectionChartPrice') 
  private collectionChartPrice!: ElementRef<HTMLCanvasElement>;

  // @ViewChild('collectionChartPrima') 
  // private collectionChartPrima!: ElementRef<HTMLCanvasElement>;

  public chartPrice: Chart|null = null;
  public chartPrima: Chart|null = null;

  public businessForm = this.formBuilder.group({
    name: [ null, Validators.required ],
    _id: [ null, Validators.required ],
  });

  public financierForm = this.formBuilder.group({
    name: [ null, Validators.required ],
    _id: [ null, Validators.required ],
  });
  
  public formGroup = this.formBuilder.group({
    workerId: '',
    startDate: [ new Date(), Validators.required ],
    endDate: [ new Date(), Validators.required ],
  });

  public workers: WorkerModel[] = [];
  public compliancePrima: number = 0;
  public materialPrima: number = 0;
  public directPrima: number = 0;

  public compliancePrice: number = 0;
  public materialPrice: number = 0;
  public directPrice: number = 0;

  public emitionCount: number = 0;
  public renovationCount: number = 0;
  public isEmition: boolean|null = null;

  private guaranties: string[] = ["GFCF", "GADF", "GAMF"];

  private workers$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();

  onSetEmition(isEmition: boolean) {
    this.isEmition = isEmition;
    this.fetchData();
  }
  
  ngOnDestroy() {
    this.workers$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
  }

  ngOnInit() {
    this.navigationService.setTitle("Suma Asegurada");

    this.navigationService.setMenu([
      // { id: 'search', label: 'Buscar', icon: 'search', show: true },
      { id: 'excel_simple', label: 'Exportar Excel', icon: 'file_download', show: false },
    ]);

    this.workers$ = this.workersService.getWorkers().subscribe(workers => {
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
                'OBRA'
              ]);

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
                  guarantee.construction?.object
                ]);
              }

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
                  guarantee.construction?.object
                ]);
              }

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
                  guarantee.construction?.object
                ]);
              }

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
                  guarantee.construction?.object
                ]);
              }

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
                  guarantee.construction?.object
                ]);
              }
              
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
                  guarantee.construction?.object
                ]);
              }
              const name = `SUMAS_ASEGURADAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
              buildExcel(body, name, wscols, [], []);
            });
          }
          break;
      
        default:
          break;
      }
    });
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


  ngAfterViewInit() {
    this.fetchData();
  }

  fetchData() {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const { startDate, endDate, workerId } = this.formGroup.value;
      
      const params: Params = {
        startDate, endDate, workerId
      }
      
      if (this.financierForm.valid) {
        params.financierId = this.financierForm.value._id;
      }

      params.isEmition = this.isEmition;

      if (this.businessForm.valid) {
        params.businessId = this.businessForm.value._id;
      }

      this.reportsService.getCollectionGuarantiesByRangeDateWorker(
        params
      ).subscribe(collection => {
        this.navigationService.loadBarFinish();
        const { material, direct, compliance } = collection;
        const colors = [randomColor(), randomColor(), randomColor()];

        this.emitionCount = 
          material.emitionCount + 
          direct.emitionCount + 
          compliance.emitionCount;
        
        this.renovationCount = 
          material.renovationCount + 
          direct.renovationCount + 
          compliance.renovationCount;

        this.chartPrice?.destroy();
        
        this.compliancePrice = 
          compliance.emitionPrice + 
          compliance.renovationPrice;
        
        this.directPrice = 
          direct.emitionPrice + 
          direct.renovationPrice;
        
        this.materialPrice = 
          material.emitionPrice + 
          material.renovationPrice;

        const dataPrice = {
          datasets: [
            {
              label: 'Dataset 1',
              data: [this.compliancePrice, this.directPrice, this.materialPrice],
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
        this.chartPrice = new Chart(canvasPrice, configPrice);
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
        this.navigationService.loadBarFinish();
      });
    }
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

