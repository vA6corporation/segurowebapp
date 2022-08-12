import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { buildExcel } from 'src/app/xlsx';
import { ConstructionModel } from '../construction.model';
import { ConstructionsService } from '../constructions.service';
import { DialogDetailConstructionsComponent } from '../dialog-detail-constructions/dialog-detail-constructions.component';

@Component({
  selector: 'app-without-documentation',
  templateUrl: './without-documentation.component.html',
  styleUrls: ['./without-documentation.component.sass']
})
export class WithoutDocumentationComponent implements OnInit {

  constructor(
    private readonly constructionsService: ConstructionsService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly formBuilder: FormBuilder, 
  ) { }
    
  public displayedColumns: string[] = [ 
    'object', 
    'worker',
    'customer',
    'partnership', 
    'createdAt',
    'actions' 
  ];
  public dataSource: ConstructionModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  public financierForm = this.formBuilder.group({
    name: [ null, Validators.required ],
    _id: [ null, Validators.required ],
  });

  private handleSearch$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
  }
    
  ngOnInit(): void {
    this.navigationService.setTitle('Obras sin documentacion');

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_customers', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.constructionsService.getCountConstructionsWithoutDocumentation().subscribe(count => {
      this.length = count;
    });

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      switch (id) {
        case 'export_customers':
          const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
          let body = [];
          body.push([
            'PERSONAL',
            'CLIENTE',
            'CONSORCIO',
            'F. DE REGISTRO',
            'AÑO DE REGISTRO',
            'MES DE REGISTRO',
            'OBJETO'
          ]);
          for (const item of this.dataSource) {
            const { customer, worker, partnership } = item;
            body.push([
              worker?.name,
              customer.name,
              partnership?.name,
              formatDate(item.createdAt, 'MM/yy', 'en-US'),
              formatDate(item.createdAt, 'yy', 'en-US'),
              formatDate(item.createdAt, 'MM', 'en-US'),
              item.object
            ]);
          }
          const name = `OBRAS_SIN_DOCUMENTACION_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
          buildExcel(body, name, wscols, [], []);
          break;
      
        default:
          break;
      }
    });
    
    this.fetchData();

    this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
      this.navigationService.loadBarStart();
      this.constructionsService.getConstructionsWithoutDocumentationByKey(key).subscribe(constructions => {
        this.navigationService.loadBarFinish();
        this.dataSource = constructions;
      });
    });
  }

  fetchData() {
    this.navigationService.loadBarStart();
    const params: Params = {};
    if (this.financierForm.valid) {
      Object.assign(params, { financierId: this.financierForm.value._id });
    } else {
      Object.assign(params, { financierId: '' });
    }
    this.constructionsService.getConstructionsWithoutDocumentation(params).subscribe(constructions => {
      this.navigationService.loadBarFinish();
      console.log(constructions);
      this.dataSource = constructions;
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
    // this.navigationService.loadBarStart();
    // this.constructionsService.getConstructionsByPage(event.pageIndex + 1, event.pageSize).subscribe(constructions => {
    //   this.navigationService.loadBarFinish();
    //   this.dataSource = constructions;
    // });
  }
}
