import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BanksService } from 'src/app/banks/banks.service';
import { CompaniesService } from 'src/app/companies/companies.service';
import { CompanyModel } from 'src/app/companies/company.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BankModel } from 'src/app/providers/bank.model';
import { DialogCreateProvidersComponent } from 'src/app/providers/dialog-create-providers/dialog-create-providers.component';
import { DialogEditProvidersComponent } from 'src/app/providers/dialog-edit-providers/dialog-edit-providers.component';
import { DialogProvidersComponent } from 'src/app/providers/dialog-providers/dialog-providers.component';
import { ProviderModel } from 'src/app/providers/provider.model';
import { DialogAttachPdfComponent } from '../dialog-attach-pdf/dialog-attach-pdf.component';
import { PaymentOrdersService } from '../payment-orders.service';

@Component({
  selector: 'app-edit-payment-orders',
  templateUrl: './edit-payment-orders.component.html',
  styleUrls: ['./edit-payment-orders.component.sass']
})
export class EditPaymentOrdersComponent implements OnInit {

  constructor(
    private readonly paymentOrdersService: PaymentOrdersService,
    private readonly navigationService: NavigationService,
    private readonly companiesService: CompaniesService,
    private readonly banksService: BanksService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
  ) { }
    
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    companyId: [ '', Validators.required ],
    concept: [ null, Validators.required ],
    charge: [ null, Validators.required ],
    observations: null,
    paymentAt: [ new Date(), Validators.required ],
    bankId: null,
    providerBankId: null,
    isPaid: false,
  });
 
  public isLoading: boolean = false;
  public provider: ProviderModel|null = null;
  public providerBanks: BankModel[] = [];
  public banks: BankModel[] = [];
  private paymentOrderId: string = '';
  public companies: CompanyModel[] = [];

  private handleClickMenu$: Subscription = new Subscription();
  private handleCompanies$: Subscription = new Subscription();
  private handleBanks$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleClickMenu$.unsubscribe();
    this.handleCompanies$.unsubscribe();
    this.handleBanks$.unsubscribe();
  }
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Editar orden de pago');
    this.navigationService.backTo();

    this.navigationService.setMenu([
      { id: 'attach_file', label: 'Adjuntar PDF', icon: 'attach_file', show: true },
      { id: 'add_provider', label: 'Agregar proveedor', icon: 'person_add', show: true },
    ]);

    this.handleBanks$ = this.banksService.handleBanks().subscribe(banks => {
      this.banks = banks;
    });

    this.handleCompanies$ = this.companiesService.handleCompanies().subscribe(companies => {
      this.companies = companies;
    });

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      switch (id) {
        case 'add_provider': {
          const dialogRef = this.matDialog.open(DialogProvidersComponent, {
            width: '600px',
            position: { top: '20px' },
          });

          dialogRef.afterClosed().subscribe(provider => {
            if (provider) {
              this.provider = provider;
              this.providerBanks = provider.banks;
            }
          });

          dialogRef.componentInstance.handleAddProvider().subscribe(() => {
            const dialogRef = this.matDialog.open(DialogCreateProvidersComponent, {
              width: '600px',
              position: { top: '20px' },
            });

            dialogRef.afterClosed().subscribe(provider => {
              if (provider) {
                this.provider = provider;
                this.providerBanks = provider.banks;
                this.formGroup.get('bankName')?.reset();
                this.formGroup.get('accountNumber')?.reset();
              }
            });
          });
          break;
        }
      
        case 'attach_file': {

          this.matDialog.open(DialogAttachPdfComponent, {
            width: '100vw',
            height: '90vh',
            position: { top: '20px' },
            data: this.paymentOrderId
          });
          break;
        }
      }
    });

    this.activatedRoute.params.subscribe(params => {
      this.paymentOrderId = params.paymentOrderId;
      this.fetchData();
    });
  }

  onAttachPdf() {
    const dialogRef = this.matDialog.open(DialogAttachPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data: this.paymentOrderId
    });

    dialogRef.componentInstance.handleChangePdf().subscribe(() => {
      this.fetchData();
    });
  }

  fetchData() {
    this.paymentOrdersService.getPaymentOrderById(this.paymentOrderId).subscribe(paymentOrder => {
      console.log(paymentOrder);
      this.formGroup.patchValue(paymentOrder);
      this.provider = paymentOrder.provider;
      this.providerBanks = paymentOrder.provider.banks;
    });
  }

  onEditProvider() {
    const dialogRef = this.matDialog.open(DialogEditProvidersComponent, {
      width: '600px',
      position: { top: '20px' },
      data: this.provider,
    });

    dialogRef.afterClosed().subscribe(provider => {
      if (provider) {
        this.provider = provider;
      }
    });
  }

  onSubmit(): void {
    if (this.provider === null) {
      this.navigationService.showMessage('Agrege un proveedor');
    } else {

      if (this.formGroup.valid) {
        this.isLoading = true;
        this.navigationService.loadSpinnerStart();
        const createdPaymentOrder = {
          ...this.formGroup.value,
          providerId: this.provider._id,
        }
        this.paymentOrdersService.update(createdPaymentOrder, this.paymentOrderId).subscribe(res => {
          console.log(res);
          this.isLoading = false;
          this.navigationService.loadSpinnerFinish();
          this.navigationService.showMessage('Se han guardado los cambios');
        }, (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.navigationService.loadSpinnerFinish();
          this.navigationService.showMessage(error.error.message);
        });
      }

    }
  }

}
