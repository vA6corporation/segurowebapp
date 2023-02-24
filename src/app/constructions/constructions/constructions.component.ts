import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { OfficeModel } from 'src/app/auth/office.model';
import { BanksService } from 'src/app/banks/banks.service';
import { buildServiceOrder } from 'src/app/buildServiceOrder';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { OfficesService } from 'src/app/offices/offices.service';
import { BankModel } from 'src/app/providers/bank.model';
import { buildExcel } from 'src/app/xlsx';
import { ConstructionModel } from '../construction.model';
import { ConstructionsService } from '../constructions.service';
import { DialogAddBailComponent } from '../dialog-add-bail/dialog-add-bail.component';
import { DialogDetailConstructionsComponent } from '../dialog-detail-constructions/dialog-detail-constructions.component';

@Component({
  selector: 'app-constructions',
  templateUrl: './constructions.component.html',
  styleUrls: ['./constructions.component.sass']
})
export class ConstructionsComponent implements OnInit {

  constructor(
    private readonly constructionsService: ConstructionsService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly officesService: OfficesService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly banksService: BanksService,
  ) { }
    
  public displayedColumns: string[] = [ 
    'emitionAt',
    'code',
    'object', 
    'worker',
    'office',
    'business',
    'partnership', 
    'actions' 
  ];
  public dataSource: ConstructionModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    officeId: '',
    startDate: [ null, Validators.required ],
    endDate: [ null, Validators.required ],
    financier: this.formBuilder.group({
      name: '',
      _id: ''
    }),
  });
  public offices: OfficeModel[] = [];
  private office: OfficeModel = new OfficeModel();
  private banks: BankModel[] = [];
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

  private handleSearch$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();
  private handleAuth$: Subscription = new Subscription();
  private handleOffices$: Subscription = new Subscription();
  private queryParams$: Subscription = new Subscription();
  private handleBanks$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
    this.handleAuth$.unsubscribe();
    this.handleOffices$.unsubscribe();
    this.queryParams$.unsubscribe();
    this.handleBanks$.unsubscribe();
  }
    
  ngOnInit(): void {
    this.navigationService.setTitle('Obras admin');

    this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
      this.office = auth.office;
    });

    this.handleBanks$ = this.banksService.handleBanks().subscribe(banks => {
      this.banks = banks;
    });

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_constructions_date', label: 'Exportar excel por fecha', icon: 'download', show: false },
      { id: 'export_constructions_office', label: 'Exportar excel por oficina', icon: 'download', show: false },
      { id: 'export_constructions_all', label: 'Exportar excel todos', icon: 'download', show: false },
      { id: 'export_emitions', label: 'Exportar emisiones', icon: 'download', show: false },
    ]);

    this.handleOffices$ = this.officesService.handleOffices().subscribe(offices => {
      this.offices = offices;
    });

    this.queryParams$ = this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
      const { startDate, endDate, key } = params;
      if (key) {
        this.constructionsService.getConstructionsByPageKey(this.pageIndex + 1, this.pageSize, key, {}).subscribe(constructions => {
          this.navigationService.loadBarFinish();
          this.dataSource = constructions;
        });
      } else {
        if (startDate && endDate) {
          this.formGroup.get('startDate')?.patchValue(new Date(Number(startDate)));
          this.formGroup.get('endDate')?.patchValue(new Date(Number(endDate)));
        }
        this.fetchData();
      }
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
      this.navigationService.loadBarStart();
      
      const queryParams: Params = { startDate: null, endDate: null, pageIndex: 0, key };

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

      this.constructionsService.getConstructionsByPageKey(this.pageIndex + 1, this.pageSize, key, {}).subscribe(constructions => {
        this.navigationService.loadBarFinish();
        this.dataSource = constructions;
      });
    });

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {

      switch (id) {
        case 'export_constructions_date': {
          
          if (this.formGroup.valid) {
            const { startDate, endDate, officeId } = this.formGroup.value;
            const params = { officeId };
            this.navigationService.loadBarStart();
            this.constructionsService.getConstructionsByRangeDate(startDate, endDate, params).subscribe(constructions=> {
              this.navigationService.loadBarFinish();
              const wscols = [ 40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
              let body = [];
              body.push([
                'ESTADO DE O.',
                'CLIENTE',
                'CONSORCIO',
                'PERSONAL',
                'A. PROGRAMADO',
                'A. EJECUTADO',
                'MES',
                'AÑO',
                'HONORARIOS',
                'PENDIENTE',
                'OBSERVACIONES',
                'OBJETO',
              ]);
              for (const construction of constructions) {
                body.push([
                  construction.constructionCodeType,
                  construction.business.name,
                  construction.partnership?.name,
                  construction.worker?.name,
                  construction.percentCompletion?.percentProgrammated,
                  construction.percentCompletion?.percentCompletion,
                  construction.percentCompletion?.month ? this.months[construction.percentCompletion?.month] : '',
                  construction.percentCompletion?.year,
                  construction.commission,
                  construction.debt,
                  construction.observations,
                  construction.object,
                ]);
              }
              const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
              buildExcel(body, name, wscols, [], []);
            });  
          } else {
            this.navigationService.showMessage('Debes de seleccionar un rango de fechas');
          }
          
          break;
        }
        case 'export_emitions': {
          this.navigationService.loadBarStart();
          this.constructionsService.getEmitions().subscribe(guaranties => {
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
              'E. DE TRAMITE',
              'E. DE REVISION',
              'F. CUMPLIMIENTO',
              'OBSERVACIONES',
              'OBJETO'
            ]);
      
            for (const guarantee of guaranties) {
              const { business, partnership, financier } = guarantee;
              body.push([
                guarantee.guaranteeType,
                financier?.name || null,
                partnership?.name || null,
                business?.name || null,
                guarantee.policyNumber,
                guarantee.price,
                guarantee.prima,
                guarantee.processStatus,
                guarantee.statusLabel,
                formatDate(guarantee.endDate, 'dd/MM/yyyy', 'en-US'),
                guarantee.observations,
                guarantee.construction.object
              ]);
            }
            const name = `RENOVACIONES_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
            buildExcel(body, name, wscols, [], []);
          }, (error: HttpErrorResponse) => {
            this.navigationService.showMessage(error.error.message);
          });
          break;
        }
        case 'export_constructions_all': {
          this.navigationService.loadBarStart();
          this.constructionsService.getConstructions().subscribe(constructions => {
            this.navigationService.loadBarFinish();
            const wscols = [ 40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
            let body = [];
            body.push([
              'ESTADO DE O.',
              'CLIENTE',
              'CONSORCIO',
              'PERSONAL',
              'A. PROGRAMADO',
              'A. EJECUTADO',
              'MES',
              'AÑO',
              'HONORARIOS',
              'PENDIENTE',
              'OBSERVACIONES',
              'OBJETO',
            ]);
            for (const construction of constructions) {
              body.push([
                construction.constructionCodeType,
                construction.business.name,
                construction.partnership?.name,
                construction.worker?.name,
                construction.percentCompletion?.percentProgrammated,
                construction.percentCompletion?.percentCompletion,
                construction.percentCompletion?.month ? this.months[construction.percentCompletion?.month] : '',
                construction.percentCompletion?.year,
                construction.commission,
                construction.debt,
                construction.observations,
                construction.object,
              ]);
            }
            const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
            buildExcel(body, name, wscols, [], []);
          });
          break;
        }
        case 'export_constructions_office': {
          this.navigationService.loadBarStart();
          this.constructionsService.getConstructionsByOffice().subscribe(constructions => {
            this.navigationService.loadBarFinish();
            const wscols = [ 40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
            let body = [];
            body.push([
              'ESTADO DE O.',
              'CLIENTE',
              'CONSORCIO',
              'PERSONAL',
              'A. PROGRAMADO',
              'A. EJECUTADO',
              'MES',
              'AÑO',
              'HONORARIOS',
              'PENDIENTE',
              'OBSERVACIONES',
              'OBJETO',
            ]);
            for (const construction of constructions) {
              body.push([
                construction.constructionCodeType,
                construction.business.name,
                construction.partnership?.name,
                construction.worker?.name,
                construction.percentCompletion?.percentProgrammated,
                construction.percentCompletion?.percentCompletion,
                construction.percentCompletion?.month ? this.months[construction.percentCompletion?.month] : '',
                construction.percentCompletion?.year,
                construction.commission,
                construction.debt,
                construction.observations,
                construction.object,
              ]);
            }
            const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}_${this.office.name.toUpperCase()}.pdf`;
            buildExcel(body, name, wscols, [], []);
          }, (error: HttpErrorResponse) => {
            this.navigationService.loadBarFinish();
            this.navigationService.showMessage(error.error.message);
          });
          break;
        }
        default:
          break;
      }

    });
  }

  onDialogFinanciers() {
    const dialogRef = this.matDialog.open(DialogFinanciesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(financier => {
      this.formGroup.patchValue({ financier: financier || {} });
      this.fetchData();
    });
  }

  async onExportPdf(constructionId: string) {
    this.navigationService.loadBarStart();
    this.constructionsService.getConstructionById(constructionId).subscribe(async construction => {
      this.navigationService.loadBarFinish();
      if (construction.payments.length) {
        if (construction.company) {
          for (const payment of construction.payments) {
            const bank = this.banks.find(e => payment.bankId === e._id);
            if (bank) {
              const pdf = await buildServiceOrder(construction, bank, payment);
              pdf.save(`ORDEN_DE_SERVICIO_${construction.business.name}.pdf`);
            }
          }
        } else {
          alert('Es necesario asignar la razon social');
        }
      } else {
        alert('No hay pagos registrados');
      }
    }, (error: HttpErrorResponse) => {
      this.navigationService.loadBarFinish();
    });
  }

  onAddBail(constructionId: string) {
    this.matDialog.open(DialogAddBailComponent, {
      data: constructionId,
      width: '600px',
      position: { top: '20px' }
    });
  }

  onChangeOffice() {
    this.pageIndex = 0;
    this.fetchData();
  }

  onRangeChange() {
    if (this.formGroup.valid) {
      this.pageIndex = 0;
      const { startDate, endDate } = this.formGroup.value;

      const queryParams: Params = { startDate: startDate.getTime(), endDate: endDate.getTime(), pageIndex: 0, key: null };

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
      this.fetchData();
    }
  }

  fetchData() {
    if (this.formGroup.valid) {
      const { startDate, endDate, officeId, financier } = this.formGroup.value;
      const params = { startDate, endDate, officeId, financierId: financier._id };
      this.navigationService.loadBarStart();
      this.constructionsService.getConstructionsByRangeDateOfficeFinancierPage(
        this.pageIndex + 1, 
        this.pageSize, 
        params
      ).subscribe(constructions => {
        this.navigationService.loadBarFinish();
        this.dataSource = constructions;
        console.log(constructions);
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
  
      this.constructionsService.getCountConstructionsByRangeDateOfficeFinancier(params).subscribe(count => {
        this.length = count;
      });
    } else {
      const { officeId, financier } = this.formGroup.value;
      const params = { officeId, financierId: financier._id };
      this.navigationService.loadBarStart();
      this.constructionsService.getConstructionsByRangeDateOfficeFinancierPage(
        this.pageIndex + 1, 
        this.pageSize, 
        params
      ).subscribe(constructions => {
        this.navigationService.loadBarFinish();
        this.dataSource = constructions;
        console.log(constructions);
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
  
      this.constructionsService.getCountConstructionsByRangeDateOfficeFinancier(params).subscribe(count => {
        this.length = count;
      });
    }
  }

  onShowDetails(constructionId: string) {
    this.matDialog.open(DialogDetailConstructionsComponent, {
      width: '100vw',
      // height: '90vh',
      position: { top: '20px' },
      data: constructionId,
    });
  }

  onDelete(constructionId: string) {
    const ok = confirm('Esta seguro de anular?...');
    if (ok) {
      this.navigationService.loadBarStart();
      this.constructionsService.delete(constructionId).subscribe(() => {
        this.navigationService.loadBarFinish();
        this.dataSource = this.dataSource.filter(e => e._id !== constructionId);
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
        this.navigationService.loadBarFinish();
      });
    }
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchData();
  }

}
