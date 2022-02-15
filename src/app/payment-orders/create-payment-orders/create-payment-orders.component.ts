import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BanksService } from 'src/app/banks/banks.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BankModel } from 'src/app/providers/bank.model';
import { DialogCreateProvidersComponent } from 'src/app/providers/dialog-create-providers/dialog-create-providers.component';
import { DialogEditProvidersComponent } from 'src/app/providers/dialog-edit-providers/dialog-edit-providers.component';
import { DialogProvidersComponent } from 'src/app/providers/dialog-providers/dialog-providers.component';
import { ProviderModel } from 'src/app/providers/provider.model';
import { DialogAttachFileComponent } from 'src/app/system/dialog-attach-file/dialog-attach-file.component';
import { PaymentOrdersService } from '../payment-orders.service';

@Component({
  selector: 'app-create-payment-orders',
  templateUrl: './create-payment-orders.component.html',
  styleUrls: ['./create-payment-orders.component.sass']
})
export class CreatePaymentOrdersComponent implements OnInit {

  constructor(
    private readonly paymentOrdersService: PaymentOrdersService,
    private readonly navigationService: NavigationService,
    private readonly banksService: BanksService,
    private readonly formBuilder: FormBuilder,
    private readonly matDialog: MatDialog,
    private readonly router: Router,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    paymentCode: '01',
    concept: [ null, Validators.required ],
    charge: [ null, Validators.required ],
    observations: null,
    paymentAt: [ new Date(), Validators.required ],
    providerBankName: '',
    providerAccountNumber: '',
    bankName: '',
    accountNumber: '',
    isPaid: true,
  });

  public paymentTypes = [
    { code: '01', name: 'EFECTIVO' },
    { code: '02', name: 'VISA' },
    { code: '03', name: 'MASTERCARD' },
    { code: '04', name: 'AMERICAN EXPRESS' },
    { code: '05', name: 'YAPE' },
    { code: '06', name: 'PLIN' },
    { code: '07', name: 'TRANSFERENCIA' },
    { code: '08', name: 'DEPOSITO' },
    { code: '09', name: 'ONLINE' },
  ];
 
  public isLoading: boolean = false;
  public provider: ProviderModel|null = null;
  public banks: BankModel[] = [];
  public providerBanks: BankModel[] = [];
  private formData: FormData|null = null;

  private handleClickMenu$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleClickMenu$.unsubscribe();
  }
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Nueva orden de pago');
    this.navigationService.backTo();

    this.banksService.getBanks().subscribe(banks => {
      this.banks = banks;
    });

    this.navigationService.setMenu([
      { id: 'attach_file', label: 'Adjuntar PDF', icon: 'attach_file', show: true },
      { id: 'add_provider', label: 'Agregar proveedor', icon: 'person_add', show: true },
    ]);

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      switch (id) {
        case 'add_provider':
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
              }
            });
          });
          break;
      
        case 'attach_file': {
          const dialogRef = this.matDialog.open(DialogAttachFileComponent, {
            width: '600px',
            position: { top: '20px' },
          });

          dialogRef.afterClosed().subscribe(file => {
            console.log(file);
            if (file) {
              this.formData = new FormData();
              this.formData.append('file', file, file.name);
              // this.navigationService.loadBarStart();
              // this.paymentOrdersService.updatePdf(formData, this.paymentOrderId).subscribe(pdfId => {
              //   this.navigationService.loadBarFinish();
              //   this.navigationService.showMessage('Registrado correctamente');
              //   this.pdfId = pdfId;

              //   const dialogRefPDf = this.matDialog.open(DialogPdfComponent, {
              //     width: '100vw',
              //     height: '90vh',
              //     position: { top: '20px' },
              //     data: `paymentOrderPdfs/${this.pdfId}`
              //   });
    
              //   dialogRefPDf.componentInstance.handleDeletePdf().subscribe(() => {
              //     this.navigationService.loadBarStart();
              //     this.paymentOrdersService.deletePdf(this.pdfId).subscribe(() => {
              //       this.navigationService.loadBarFinish();
              //       this.fetchData();
              //     });
              //   });

              // }, (error: HttpErrorResponse) => {
              //   this.navigationService.loadBarFinish();
              //   this.navigationService.showMessage(error.error.message);
              // });
            }
          });
          break;
        }
      }
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
        this.providerBanks = provider.banks;
      }
    });
  }

  onProviderBankChange(accountNumber: string) {
    this.formGroup.get('providerBankName')?.patchValue(this.providerBanks.find(e => e.accountNumber == accountNumber)?.bankName);
  }

  onBankChange(accountNumber: string) {
    this.formGroup.get('bankName')?.patchValue(this.banks.find(e => e.accountNumber == accountNumber)?.bankName);
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
        this.paymentOrdersService.create(createdPaymentOrder).subscribe(paymentOrder => {
          console.log(paymentOrder);
          if (this.formData) {
            this.paymentOrdersService.updatePdf(this.formData, paymentOrder._id).subscribe(pdfId => {
              this.isLoading = false;
              this.router.navigate(['/paymentOrders']);
              this.navigationService.loadSpinnerFinish();
              this.navigationService.showMessage('Registrado correctamente');
            });
          } else {
            this.isLoading = false;
            this.router.navigate(['/paymentOrders']);
            this.navigationService.loadSpinnerFinish();
            this.navigationService.showMessage('Registrado correctamente');
          }
        }, (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.navigationService.loadSpinnerFinish();
          this.navigationService.showMessage(error.error.message);
        });
      }

    }
  }
  
}
