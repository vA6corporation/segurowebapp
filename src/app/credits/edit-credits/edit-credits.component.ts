import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogBrokersComponent } from 'src/app/brokers/dialog-brokers/dialog-brokers.component';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { CreditsService } from '../credits.service';
import { CreditPdfData, DialogAttachPdfComponent } from '../dialog-attach-pdf/dialog-attach-pdf.component';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { PaymentModel } from 'src/app/payments/payment.model';
import { UserModel } from 'src/app/users/user.model';
import { DialogPaymentsComponent } from 'src/app/payments/dialog-payments/dialog-payments.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-edit-credits',
  templateUrl: './edit-credits.component.html',
  styleUrls: ['./edit-credits.component.sass']
})
export class EditCreditsComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly creditsService: CreditsService,
    private readonly navigationService: NavigationService,
    private readonly workersService: WorkersService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly matDialog: MatDialog,
  ) { }

  public formGroup: UntypedFormGroup = this.formBuilder.group({
    partnership: this.formBuilder.group({
      name: null,
      _id: null,
    }),
    financier: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    business: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    worker: this.formBuilder.group({
      _id: [ null, Validators.required ]
    }),
    credit: this.formBuilder.group({
      days: [ null, Validators. required ],
      emitionAt: [ null, Validators.required ],
      prima: null,
      commission: null,
      currencyCode: 'PEN',
      charge: [ null, Validators.required ],
    }),
  });

  public construction: ConstructionModel|null = null;
  public isLoading: boolean = false;
  public workers: WorkerModel[] = [];
  private creditId: string = '';
  public payments: PaymentModel[] = [];
  public user: UserModel|null = null;

  private handleAuth$: Subscription = new Subscription();
  private handleCompanies$: Subscription = new Subscription();
  private handleBanks$: Subscription = new Subscription();
  private handleWorkers$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleAuth$.unsubscribe();
    this.handleCompanies$.unsubscribe();
    this.handleBanks$.unsubscribe();
    this.handleWorkers$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.backTo();
    
    this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
      this.workers = workers;
    });

    this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
      this.user = auth.user;
    });
    
    this.activatedRoute.params.subscribe(params => {
      this.creditId = params.creditId;
      this.navigationService.setTitle('Editar linea de credito');
      this.creditsService.getCreditById(this.creditId).subscribe(credit => {
        const { partnership, business, financier } = credit;
        this.formGroup.get('partnership')?.patchValue(partnership || {});
        this.formGroup.get('business')?.patchValue(business);
        this.formGroup.get('financier')?.patchValue(financier);
        this.formGroup.get('credit')?.patchValue(credit);
        this.formGroup.get('worker')?.patchValue({ _id: credit.workerId });
        this.payments = credit.payments;
      });
    });
  }

  onDialogPayments() {
    const dialogRef = this.matDialog.open(DialogPaymentsComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(payment => {
      if (payment) {
        this.payments.push(payment);
      }
    });
  }

  onRemovePayment(index: number) {
    this.payments.splice(index, 1);
  }

  openDialogBusinesses() {
    const dialogRef = this.matDialog.open(DialogBusinessesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(business => {
      this.formGroup.patchValue({ business: business || {} });
    });
  }

  openDialogBrokers() {
    const dialogRef = this.matDialog.open(DialogBrokersComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(broker => {
      this.formGroup.patchValue({ broker: broker || {} });
    });
  }

  openDialogFinanciers() {
    const dialogRef = this.matDialog.open(DialogFinanciesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(financier => {
      this.formGroup.patchValue({ financier: financier || {} });
    });
  }

  openDialogBeneficiaries() {
    const dialogRef = this.matDialog.open(DialogBeneficiariesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(beneficiary => {
      this.formGroup.patchValue({ beneficiary: beneficiary || {} });
    });
  }

  openDialogPartnerships() {
    const dialogRef = this.matDialog.open(DialogPartnershipsComponent, {
      width: '600px',
      position: { top: '20px' }
    });
    
    dialogRef.afterClosed().subscribe(partnership => {
      if (partnership) {
        const { business } = partnership;
        this.formGroup.patchValue({ business: business || {} });
        this.formGroup.patchValue({ partnership: partnership || {} });
      }
    });
  }

  onAttachPdfCarta() {
    const data: CreditPdfData = {
      type: 'CARTA',
      creditId: this.creditId,
    }

    this.matDialog.open(DialogAttachPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfVoucher() {
    const data: CreditPdfData = {
      type: 'VOUCHER',
      creditId: this.creditId,
    }

    this.matDialog.open(DialogAttachPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfDocuments() {
    const data: CreditPdfData = {
      type: 'DOCUMENT',
      creditId: this.creditId,
    }

    this.matDialog.open(DialogAttachPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { business, financier, partnership, worker, credit } = this.formGroup.value;
      credit.businessId = business._id;
      credit.financierId = financier._id;
      credit.partnershipId = partnership._id;
      credit.workerId = worker._id;
      this.navigationService.loadBarStart();
      this.creditsService.update(credit, this.payments, this.creditId).subscribe(() => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
