import { Component, OnInit } from '@angular/core';
import { BusinessesService } from '../businesses.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ConstructionsService } from 'src/app/constructions/constructions.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BusinessModel } from '../business.model';
import { OfficeModel } from 'src/app/auth/office.model';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogConstructionBusinessesComponent } from '../dialog-construction-businesses/dialog-construction-businesses.component';
import { formatDate } from '@angular/common';
import { buildExcel } from 'src/app/xlsx';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-deleted-businesses',
  templateUrl: './deleted-businesses.component.html',
  styleUrls: ['./deleted-businesses.component.sass']
})
export class DeletedBusinessesComponent implements OnInit {

  constructor(
    private readonly businessesService: BusinessesService,
    private readonly navigationService: NavigationService,
    private readonly constructionsService: ConstructionsService,
    private readonly authService: AuthService,
    private readonly matDialog: MatDialog,
  ) { }
    
  public displayedColumns: string[] = [ 'document', 'name', 'email', 'mobileNumber', 'actions' ];
  public dataSource: BusinessModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  private office: OfficeModel = new OfficeModel();
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

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
    this.handleAuth$.unsubscribe();
  }
    
  ngOnInit(): void {
    this.navigationService.setTitle('Empresas');

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_businesses', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.businessesService.getCountBusinesses({ isDeleted: true }).subscribe(count => {
      this.length = count;
    });

    this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
      this.office = auth.office;
    });

    this.fetchData();

    this.handleSearch$ = this.navigationService.handleSearch().subscribe((key: string) => {
      this.navigationService.loadBarStart();
      this.businessesService.getBusinessesByKey(key).subscribe(businesses => {
        this.navigationService.loadBarFinish();
        this.dataSource = businesses;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    });

    // this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
    //   switch (id) {
    //     case 'export_businesses': {
    //       this.downloadExcel();
    //       break;
    //     }
    //     default:
    //       break;
    //   }
    // });
  }

  fetchData() {
    this.navigationService.loadBarStart();
    this.businessesService.getBusinessesByPage(this.pageIndex + 1, this.pageSize, { isDeleted: true }).subscribe(businesses => {
      this.navigationService.loadBarFinish();
      this.dataSource = businesses;
    });
  }

  onShowConstructions(businessId: string) {
    const dialogRef = this.matDialog.open(DialogConstructionBusinessesComponent, {
      width: '600px',
      position: { top: '20px' },
      data: businessId,
    });
  }

  onRestore(businessId: string) {
    // const ok = confirm('Esta seguro de aliminar?...');
    // if (ok) {
    // }
    this.navigationService.loadBarStart();
    this.businessesService.restore(businessId).subscribe(() => {
      this.navigationService.loadBarFinish();
      this.navigationService.showMessage('Se ha restaurado correctamente');
      this.fetchData();
    });
  }

  onExportConstructions(businessId: string) {
    this.navigationService.loadBarStart();
    this.constructionsService.getConstructionsByBusiness(businessId).subscribe(constructions => {
      this.navigationService.loadBarFinish();
      const wscols = [ 40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
      let body = [];
      body.push([
        'ESTADO DE O.',
        'CLIENTE',
        'CONSORCIO',
        'PERSONAL',
        'OBJETO',
      ]);
      for (const construction of constructions) {
        body.push([
          construction.constructionCodeType,
          construction.business.name,
          construction.partnership?.name,
          construction.worker?.name,
          construction.percentCompletion?.month ? this.months[construction.percentCompletion?.month] : '',
          construction.percentCompletion?.year,
          construction.object,
        ]);
      }
      const name = `OBRAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}_${this.office.name.toUpperCase()}`;
      buildExcel(body, name, wscols, [], []);
    }, (error: HttpErrorResponse) => {
      this.navigationService.loadBarFinish();
      this.navigationService.showMessage(error.error.message);
    });
  }

  // downloadExcel() {
  //   this.navigationService.loadBarStart();
  //   this.businessesService.getBusinesses().subscribe(businesses => {
  //     console.log(businesses);
  //     this.navigationService.loadBarFinish();
  //     const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
  //     let body = [];
  //     body.push([
  //       'RUC',
  //       'RAZON SOCIAL',
  //       'EMAIL',
  //       'CELULAR',
  //       'PERSONAL A CARGO'
  //     ]);
  //     for (const business of businesses) {
  //       body.push([
  //         business.document,
  //         business.name,
  //         business.email,
  //         business.mobileNumber,
  //         business.worker.name
  //       ]);
  //     }
  //     const name = `CLIENTES_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
  //     buildExcel(body, name, wscols, [], []);
  //   });
  // }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize
    this.fetchData();
  }
}
