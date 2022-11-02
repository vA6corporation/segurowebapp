import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { OfficeModel } from 'src/app/auth/office.model';
import { ConstructionsService } from 'src/app/constructions/constructions.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { buildExcel } from 'src/app/xlsx';
import { BusinessModel } from '../business.model';
import { BusinessesService } from '../businesses.service';
import { DialogConstructionBusinessesComponent } from '../dialog-construction-businesses/dialog-construction-businesses.component';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.sass']
})
export class BusinessesComponent implements OnInit {

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

    this.businessesService.getBusinessCount().subscribe(count => {
      this.length = count;
    });

    this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
      this.office = auth.office;
    });

    this.businessesService.getBusinessesByPage(this.pageIndex + 1, this.pageSize).subscribe(businesses => {
      this.dataSource = businesses;
    });

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

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      switch (id) {
        case 'export_businesses': {
          this.downloadExcel();
          break;
        }
        default:
          break;
      }
    });
  }

  onShowConstructions(businessId: string) {
    const dialogRef = this.matDialog.open(DialogConstructionBusinessesComponent, {
      width: '600px',
      position: { top: '20px' },
      data: businessId,
    });
  }

  onExportConstructions(businessId: string) {
    // const dialogRef = this.matDialog.open(DialogConstructionBusinessesComponent, {
    //   width: '600px',
    //   position: { top: '20px' },
    //   data: businessId,
    // });
    this.navigationService.loadBarStart();
    this.constructionsService.getConstructionsByBusiness(businessId).subscribe(constructions => {
      this.navigationService.loadBarFinish();
      const wscols = [ 40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
      let body = [];
      body.push([
        'AVANCE (%)',
        'ESTADO DE O.',
        'CLIENTE',
        'CONSORCIO',
        'PERSONAL',
        'OBJETO',
      ]);
      for (const construction of constructions) {
        body.push([
          construction.percentageOfCompletion,
          construction.constructionCodeType,
          construction.business.name,
          construction.partnership?.name,
          construction.worker?.name,
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

  downloadExcel() {
    this.navigationService.loadBarStart();
    this.businessesService.getBusinesses().subscribe(businesses => {
      this.navigationService.loadBarFinish();
      const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
      let body = [];
      body.push([
        'RUC',
        'RAZON SOCIAL',
        'EMAIL',
        'CELULAR',
      ]);
      for (const business of businesses) {
        body.push([
          business.document,
          business.name,
          business.email,
          business.mobileNumber,
        ]);
      }
      const name = `CLIENTES_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
      buildExcel(body, name, wscols, [], []);
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.businessesService.getBusinessesByPage(event.pageIndex + 1, event.pageSize).subscribe(businesses => {
      this.dataSource = businesses;
    });
  }

}
