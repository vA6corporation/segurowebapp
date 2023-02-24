import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { CompaniesService } from 'src/app/companies/companies.service';
import { CompanyModel } from 'src/app/companies/company.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { buildExcel } from 'src/app/xlsx';
import { DialogAttachPdfComponent } from '../dialog-attach-pdf/dialog-attach-pdf.component';
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
    private readonly companiesService: CompaniesService,
    private readonly matDialog: MatDialog,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: UntypedFormBuilder,
  ) { }
    
  public displayedColumns: string[] = [ 'provider', 'company', 'concept', 'charge', 'paymentAt', 'actions' ];
  public dataSource: PaymentOrderModel[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  public companies: CompanyModel[] = [];
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    startDate: [ null, Validators.required ],
    endDate: [ null, Validators.required ],
    companyId: '',
  });
  private params: Params = {};
  private key: string = '';

  private handleCompanies$: Subscription = new Subscription();
  private handleSearch$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleCompanies$.unsubscribe();
    this.handleSearch$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Ordenes de pago');

    this.handleCompanies$ = this.companiesService.handleCompanies().subscribe(companies => {
      this.companies = companies;
    });

    this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
      this.pageIndex = 0;
      this.key = key;

      const queryParams: Params = { key, pageIndex: this.pageIndex };

      Object.assign(this.params, queryParams);

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

      this.fetchCount();
      this.fetchData();
    });

    this.navigationService.setMenu([
      { id: 'search', label: 'Buscar', icon: 'search', show: true },
      { id: 'export_excel', label: 'Exportar excel', icon: 'file_download', show: false },
    ]);

    this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
      const { pageIndex, pageSize, startDate, endDate, key, companyId } = params;
      this.pageIndex = Number(pageIndex || 0);
      this.pageSize = Number(pageSize || 10);
      this.key = key || '';
      this.formGroup.patchValue({ companyId: companyId || '' });
      Object.assign(this.params, { companyId: companyId || '' });
      if (startDate && endDate) {
        this.formGroup.patchValue({ startDate: new Date(startDate), endDate: new Date(endDate) });
        Object.assign(this.params, { startDate: new Date(startDate), endDate: new Date(endDate) });
      }
      this.fetchCount();
      this.fetchData();
    });

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      this.navigationService.loadBarStart();
      if (this.formGroup.valid) {
        const params = this.formGroup.value;
        this.paymentOrdersService.getPaymentOrdersByRangeDateCompany(params).subscribe(paymentOrders => {
          this.navigationService.loadBarFinish();
          const wscols = [ 40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
          let body = [];
          body.push([
            'F. DE PAGO',
            'PROVEEDOR',
            'CONCEPTO',
            'IMPORTE',
            'RAZON SOCIAL',
            'N° DE CUENTA',
            'BANCO'
          ]);
          for (const paymentOrder of paymentOrders) {
            body.push([
              formatDate(new Date(paymentOrder.paymentAt), 'dd/MM/yyyy', 'en-US'),
              paymentOrder.provider.name,
              paymentOrder.concept,
              paymentOrder.charge.toFixed(2),
              paymentOrder.company?.name,
              paymentOrder.bank?.accountNumber,
              paymentOrder.bank?.bankName,
            ]);
          }
          const name = `ORDENES_DE_PAGO_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
          buildExcel(body, name, wscols, [], []);
        });
      } else {
        const { companyId } = this.formGroup.value;
        const params = { companyId };
        this.paymentOrdersService.getPaymentOrdersByRangeDateCompany(params).subscribe(paymentOrders => {
          this.navigationService.loadBarFinish();
          const wscols = [ 40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
          let body = [];
          body.push([
            'F. DE PAGO',
            'PROVEEDOR',
            'CONCEPTO',
            'IMPORTE',
            'RAZON SOCIAL',
            'N° DE CUENTA',
            'BANCO'
          ]);
          for (const paymentOrder of paymentOrders) {
            body.push([
              formatDate(new Date(paymentOrder.paymentAt), 'dd/MM/yyyy', 'en-US'),
              paymentOrder.provider.name,
              paymentOrder.concept,
              paymentOrder.charge.toFixed(2),
              paymentOrder.company?.name,
              paymentOrder.bank?.accountNumber,
              paymentOrder.bank?.bankName,
            ]);
          }
          const name = `ORDENES_DE_PAGO_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
          buildExcel(body, name, wscols, [], []);
        });
      }
    });
  }

  fetchData() {
    if (this.key) {
      this.navigationService.loadBarStart();
      this.paymentOrdersService.getPaymentOrdersByPageKey(this.pageIndex + 1, this.pageSize, this.key).subscribe(paymentOrders => {
        this.navigationService.loadBarFinish();
        this.dataSource = paymentOrders;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    } else {
      this.navigationService.loadBarStart();
      this.paymentOrdersService.getPaymentOrdersByRangeDateCompanyPage(this.pageIndex + 1, this.pageSize, this.params).subscribe(paymentOrders => {
        this.navigationService.loadBarFinish();
        this.dataSource = paymentOrders;
      });
    }
  }

  fetchCount() {
    if (this.key) {
      this.paymentOrdersService.getCountPaymentOrdersByKey(this.key).subscribe(count => {
        this.length = count;
      });
    } else {
      this.paymentOrdersService.getCountPaymentOrdersByRangeDateCompany(this.params).subscribe(count => {
        this.length = count;
      });
    }
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    const queryParams: Params = { pageIndex: this.pageIndex, pageSize: this.pageSize };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });

    this.fetchData();
  }

  onRangeChange() {
    if (this.formGroup.valid) {
      this.pageIndex = 0;
      this.key = '';
      const { startDate, endDate } = this.formGroup.value;
      const queryParams: Params = { startDate, endDate, pageIndex: this.pageIndex, key: null };
      Object.assign(this.params, queryParams);

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

      this.fetchCount();
      this.fetchData();
    }
  }

  onCompanyChange() {
    this.pageIndex = 0;
    this.key = '';
    const { companyId } = this.formGroup.value;
    const queryParams: Params = { companyId, pageIndex: this.pageIndex, key: null };
    Object.assign(this.params, queryParams);

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });

    this.fetchCount();
    this.fetchData();
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

  onShowPdf(paymentOrder: PaymentOrderModel) {
    const dialogRef = this.matDialog.open(DialogAttachPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data: paymentOrder._id
    });

    dialogRef.componentInstance.handleChangePdf().subscribe(() => {
      this.fetchData();
    });
  }

}
