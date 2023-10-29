import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BanksService } from 'src/app/banks/banks.service';
import { CompaniesService } from 'src/app/companies/companies.service';
import { CompanyModel } from 'src/app/companies/company.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { PaymentOrdersService } from 'src/app/payment-orders/payment-orders.service';
import { BankModel } from 'src/app/providers/bank.model';
import { DialogCreateProvidersComponent } from 'src/app/providers/dialog-create-providers/dialog-create-providers.component';
import { ProviderModel } from 'src/app/providers/provider.model';
import { ProvidersService } from 'src/app/providers/providers.service';
import { UserModel } from 'src/app/users/user.model';
import { parseExcel } from 'src/app/xlsx';

@Component({
  selector: 'app-payment-orders',
  templateUrl: './payment-orders.component.html',
  styleUrls: ['./payment-orders.component.sass']
})
export class PaymentOrdersComponent implements OnInit {

  constructor(
    private readonly banksService: BanksService,
    private readonly providersService: ProvidersService,
    private readonly paymentOrdersService: PaymentOrdersService,
    private readonly navigationService: NavigationService,
    private readonly companiesService: CompaniesService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly matDialog: MatDialog
  ) { }

  public users: UserModel[] = [];
  public displayedColumns: string[] = [ 'index', 'concept', 'charge', 'currencyCode', 'paymentAt', 'bank', 'company', 'provider', 'actions' ];
  public dataSource: any[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  public isLoading: boolean = false;
  private banks: BankModel[] = [];
  private companies: CompanyModel[] = [];
  private providers: ProviderModel[] = [];

  private handleCompanies$: Subscription = new Subscription();
  private handleBanks$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleCompanies$.unsubscribe();
    this.handleBanks$.unsubscribe();
  }
      
  ngOnInit(): void {
    this.navigationService.setTitle('Importar Excel');
    this.navigationService.backTo();

    this.handleBanks$ = this.banksService.handleBanks().subscribe(banks => {
      this.banks = banks;
    });

    this.handleCompanies$ = this.companiesService.handleCompanies().subscribe(companies => {
      this.companies = companies;
    });

    this.providersService.getProviders().subscribe(providers => {
      this.providers = providers;
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.navigationService.loadBarStart();
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    const queryParams: Params = { pageIndex: this.pageIndex, pageSize: this.pageSize };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
  }

  async onFilePdfSelected(files: FileList|null, input: HTMLInputElement, table: MatTable<any>) {
    if (files) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const formData = new FormData();
        formData.append('file', file);
        console.log(file.name);
        console.log(this.dataSource);
        const paymentOrder = this.dataSource.find(e => e.pdfName === file.name);
        if (paymentOrder) {
          paymentOrder.file = formData;
        } else {
          alert(`Archivo no encontrado ${file.name}`);
        }
      }
    }
    input.value = '';
  }

  async onFileSelected(files: FileList|null, input: HTMLInputElement, table: MatTable<any>) {
    if (files && files[0]) {
      const paymentOrders = await parseExcel(files[0]);
      input.value = '';
      this.dataSource = [];
      try {
        for (let index = 0; index < paymentOrders.length; index++) {
          const paymentOrder = paymentOrders[index];
          
          if (paymentOrder.concepto && paymentOrder.importe && paymentOrder.moneda && paymentOrder.razonSocial && paymentOrder.cuentaEmpresa && paymentOrder.fechaPago && paymentOrder.rucProveedor && paymentOrder.numeroPdf) {
            const bank = this.banks.find(e => e.accountNumber.toString() === paymentOrder.cuentaEmpresa.toString())
            if (bank == null) {
              throw Error(`Cuenta bancaria de la empresa no existe (Fila N° ${index + 1})`);  
            }

            const company = this.companies.find(e => e.name === paymentOrder.razonSocial);
            if (company == null) {
              throw Error(`Razon social de la empresa no existe (Fila N° ${index + 1})`);
            }

            const provider = this.providers.find(e => e.document.toString() === paymentOrder.rucProveedor.toString());

            const dateString = paymentOrder.fechaPago;
            const splitDates = dateString.split('/');
            const paymentAt = new Date(`${splitDates[1]}/${splitDates[0]}/${splitDates[2]}`);

            const createdPaymentOrder = {
              concept: paymentOrder.concepto,
              charge: paymentOrder.importe,
              currencyCode: paymentOrder.moneda,
              paymentAt,
              isPaid: true,
              bank,
              bankId: bank._id,
              company,
              companyId: company._id,
              provider,
              providerId: provider ? provider._id : null,
              pdfName: paymentOrder.numeroPdf.toString() + '.pdf',
            };

            this.dataSource.push(createdPaymentOrder);
            
          } else {
            throw Error(`Hay un campo faltante (Fila N° ${index + 1})`);
          }
        }
        table.renderRows();
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert('Error desconocido');
        }
      }
    }
  }

  onAddProvider(paymentOrder: any) {
    const dialogRef = this.matDialog.open(DialogCreateProvidersComponent, {
      width: '600px',
      position: { top: '20px' },
    });

    dialogRef.afterClosed().subscribe(provider => {
      if (provider) {
        paymentOrder.providerId = provider._id,
        paymentOrder.provider = provider;
      }
    });
  }

  async onSubmit() {
    if (this.dataSource.length && this.dataSource.filter(e => e.file).length === this.dataSource.length && !this.dataSource.filter(e => e.provider == null).length) {
      this.navigationService.loadSpinnerStart();
      for (const paymentOrder of this.dataSource) {
        const createdPaymentOrder = await this.paymentOrdersService.create(paymentOrder).toPromise();
        await this.paymentOrdersService.uploadFile(paymentOrder.file, createdPaymentOrder._id).toPromise();
      }
      this.navigationService.loadSpinnerFinish();
      this.navigationService.showMessage('Se han guardado los cambios');
      this.dataSource = [];
    } else {
      alert('Revise que no falten registros')
    }
  }

}
