import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ReportsService } from 'src/app/reports/reports.service';
import { randomColor } from 'src/app/randomColor';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { formatDate } from '@angular/common';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { buildExcel } from 'src/app/xlsx';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { first } from 'rxjs/operators';
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
    private readonly formBuilder: UntypedFormBuilder,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) { }
    
  @ViewChild('collectionChartPrice') 
  private collectionChartPrice!: ElementRef<HTMLCanvasElement>;

  public chartPrice: Chart|null = null;
  public chartPrima: Chart|null = null;
  
  public formGroup = this.formBuilder.group({
    workerId: '',
    startDate: [ '', Validators.required ],
    endDate: [ '', Validators.required ],
    financier: this.formBuilder.group({
      name: '',
      _id: '',
    }),
    business: this.formBuilder.group({
      name: '',
      _id: '',
    }),
    isEmition: '',
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
  private params: Params = {};

  private guaranties: string[] = ["GFCF", "GADF", "GAMF"];

  private handleWorkers$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();
  private queryParams$: Subscription = new Subscription();

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

  ngOnDestroy() {
    this.handleWorkers$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
    this.queryParams$.unsubscribe();
  }

  ngOnInit() {
    this.navigationService.setTitle("Suma asegurada");

    this.navigationService.setMenu([
      { id: 'excel_simple', label: 'Exportar excel', icon: 'file_download', show: false },
    ]);

    this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
      this.workers = workers;
    });

    this.queryParams$ = this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
      const { startDate, endDate } = params;
      if (startDate && endDate) {
        Object.assign(this.params, {
          startDate: new Date(startDate),
          endDate: new Date(endDate)
        });
        this.formGroup.patchValue({ startDate: new Date(startDate), endDate: new Date(endDate) });
      }
      this.fetchData();
    });

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      switch (id) {
        case 'excel_simple':
          this.navigationService.loadBarStart();
            const { startDate, endDate, workerId, financier } = this.formGroup.value;
      
            const params: Params = {
              startDate, endDate, workerId, financierId: financier._id
            };
      
            this.reportsService.getPrimasByRangeDateWorker(
              params
            ).subscribe(collection => {
              const { payedDirect, notPayedDirect, payedCompliance, notPayedCompliance, payedMaterial, notPayedMaterial } = collection;
              this.navigationService.loadBarFinish();
              const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
              let body = [];
              body.push([
                'MES DE EMISION',
                'AÑO DE EMISION',
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
                'OFICINA',
                'EMISION',
                'OBRA'
              ]);

              for (const guarantee of payedCompliance) {
                const { business, partnership, financier } = guarantee;
                body.push([
                  this.months[new Date(guarantee.startDate).getMonth()],
                  new Date(guarantee.startDate).getFullYear(),
                  guarantee.guaranteeType,
                  financier?.name || null,
                  partnership?.name || null,
                  business?.name || null,
                  guarantee.policyNumber,
                  guarantee.price,
                  guarantee.prima,
                  guarantee.isPaid ? 'PAGADO' : 'NO PAGADO',
                  guarantee.processStatus,
                  guarantee.statusLabel,
                  formatDate(guarantee.endDate, 'dd/MM/yyyy', 'en-US'),
                  guarantee.office.name.toUpperCase(),
                  guarantee.isEmition ? 'SI' : 'NO',
                  guarantee.construction?.object
                ]);
              }

              for (const guarantee of payedDirect) {
                const { business, partnership, financier } = guarantee;
                body.push([
                  this.months[new Date(guarantee.startDate).getMonth()],
                  new Date(guarantee.startDate).getFullYear(),
                  guarantee.guaranteeType,
                  financier?.name || null,
                  partnership?.name || null,
                  business?.name || null,
                  guarantee.policyNumber,
                  guarantee.price,
                  guarantee.prima,
                  guarantee.isPaid ? 'PAGADO' : 'NO PAGADO',
                  guarantee.processStatus,
                  guarantee.statusLabel,
                  formatDate(guarantee.endDate, 'dd/MM/yyyy', 'en-US'),
                  guarantee.office.name.toUpperCase(),
                  guarantee.isEmition ? 'SI' : 'NO',
                  guarantee.construction?.object
                ]);
              }

              for (const guarantee of payedMaterial) {
                const { business, partnership, financier } = guarantee;
                body.push([
                  this.months[new Date(guarantee.startDate).getMonth()],
                  new Date(guarantee.startDate).getFullYear(),
                  guarantee.guaranteeType,
                  financier?.name || null,
                  partnership?.name || null,
                  business?.name || null,
                  guarantee.policyNumber,
                  guarantee.price,
                  guarantee.prima,
                  guarantee.isPaid ? 'PAGADO' : 'NO PAGADO',
                  guarantee.processStatus,
                  guarantee.statusLabel,
                  formatDate(guarantee.endDate, 'dd/MM/yyyy', 'en-US'),
                  guarantee.office.name.toUpperCase(),
                  guarantee.isEmition ? 'SI' : 'NO',
                  guarantee.construction?.object
                ]);
              }
              
              const name = `SUMAS_ASEGURADAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
              buildExcel(body, name, wscols, [], []);
            });
          break;
      
        default:
          break;
      }
    });
  }

  fetchData() {
    this.navigationService.loadBarStart();
    this.reportsService.getCollectionGuarantiesByRangeDateWorker(
      this.params
    ).subscribe(collection => {
      this.navigationService.loadBarFinish();
      const { material, direct, compliance } = collection;
      const colors = [randomColor(), randomColor(), randomColor()];

      this.emitionCount = 0;
      this.renovationCount = 0;

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

  onChangeEmition() {
    const { isEmition } = this.formGroup.value;
    const queryParams: Params = { isEmition };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });

    Object.assign(this.params, queryParams);
    this.fetchData();
  }
  
  openDialogFinanciers() {
    const dialogRef = this.matDialog.open(DialogFinanciesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(financier => {
      if (financier) {
        this.formGroup.patchValue({ financier });
        Object.assign(this.params, { financierId: financier._id });
      } else {
        this.formGroup.patchValue({ financier: { name: null, _id: null } });
        Object.assign(this.params, { financierId: null });
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
        this.formGroup.patchValue({ business });
        Object.assign(this.params, { businessId: business._id });
      } else {
        this.formGroup.patchValue({ business: { name: null, _id: null } });
        Object.assign(this.params, { businessId: null });
      }
      this.fetchData();
    });
  }

  onChangeWorker() {
    const { workerId } = this.formGroup.value;
    const queryParams: Params = { workerId, pageIndex: 0, key: null };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });

    Object.assign(this.params, queryParams);
    this.fetchData();
  }

  onRangeChange() {
    if (this.formGroup.valid) {
      const { startDate, endDate } = this.formGroup.value;
      const queryParams: Params = { startDate, endDate, pageIndex: 0, key: null };

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

      Object.assign(this.params, queryParams);
      this.fetchData();
    }
  }

  onChange() {
    this.fetchData();
  }

}

