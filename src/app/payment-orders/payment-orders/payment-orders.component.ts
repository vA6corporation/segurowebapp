import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPdfComponent } from 'src/app/system/dialog-pdf/dialog-pdf.component';
import { PaymentOrderModel } from '../payment-order.model';
import { PaymentOrdersService } from '../payment-orders.service';

@Component({
  selector: 'app-payment-orders',
  templateUrl: './payment-orders.component.html',
  styleUrls: ['./payment-orders.component.sass']
})
export class PaymentOrdersComponent implements OnInit {

  constructor(
    private readonly paymentOrdersService: PaymentOrdersService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
  ) { }
    
  public displayedColumns: string[] = [ 'provider', 'concept', 'charge', 'paymentAt', 'actions' ];
  public dataSource: PaymentOrderModel[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  private handleClickMenu$: Subscription = new Subscription();
  private handleSearch$: Subscription = new Subscription();
  private auth$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
    this.auth$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Ordenes de pago');

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      switch (id) {
        case 'export_excel': {
          // this.navigationService.loadBarStart();
          // this.customersService.getCustomerModels().subscribe(customers => {
          //   this.navigationService.loadBarFinish();
          //   const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
          //   let body = [];
          //   body.push([
          //     'T. DOCUMENTO',
          //     'DOCUMENTO',
          //     'NOMBRES',
          //     'DIRECCION',
          //     'EMAIL',
          //     'CELULAR',
          //   ]);
          //   for (const customer of customers) {
          //     body.push([
          //       customer.identificationType,
          //       customer.identificationNumber,
          //       customer.name,
          //       customer.address,
          //       customer.email,
          //       customer.mobileNumber,
          //     ]);
          //   }
          //   const name = `Clientes_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}_${this.business.businessName.replace(/ /g, '_')}`;
          //   buildExcel(body, name, wscols, []);
          // }, (error: HttpErrorResponse) => {
          //   this.navigationService.showMessage(error.error.message);
          // });
        }
      }
    });

    this.route.queryParams.subscribe(params => {
      
      this.navigationService.setMenu([
        { id: 'search', label: 'Buscar', icon: 'search', show: true },
        { id: 'export_excel', label: 'Exportar Excel', icon: 'file_download', show: false },
      ]);

      const { pageIndex, pageSize } = params;
      this.pageIndex = Number(pageIndex || 0);
      this.pageSize = Number(pageSize || 10);
      this.fetchData();
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe((key: string) => {
      // this.customersService.getCustomerModelsByKey(key).subscribe(customers => {
      //   this.dataSource = customers;
      // }, (error: HttpErrorResponse) => {
      //   this.navigationService.showMessage(error.error.message);
      // });
    });
  }

  onShowPdf(paymentOrder: PaymentOrderModel) {
    const dialogRefPDf = this.matDialog.open(DialogPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data: `paymentOrderPdfs/${paymentOrder.pdfId}`
    });

    dialogRefPDf.componentInstance.handleDeletePdf().subscribe(() => {
      this.navigationService.loadBarStart();
      this.paymentOrdersService.deletePdf(paymentOrder.pdfId || '').subscribe(() => {
        this.navigationService.loadBarFinish();
        paymentOrder.pdfId = null;
      });
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    const queryParams: Params = { pageIndex: this.pageIndex, pageSize: this.pageSize };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  }

  fetchData() {
    this.paymentOrdersService.getPaymentOrders().subscribe(paymentOrders => {
      console.log(paymentOrders);
      this.dataSource = paymentOrders;
    });
  }

  onDelete(providerId: string) {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      this.paymentOrdersService.delete(providerId).subscribe(() => {
        this.navigationService.showMessage('Eliminado correctamente');
        this.fetchData();
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
