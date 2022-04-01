import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogBrokersComponent } from 'src/app/brokers/dialog-brokers/dialog-brokers.component';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { DialogCustomersComponent } from 'src/app/customers/dialog-customers/dialog-customers.component';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { Location } from '@angular/common'
import { CreditsService } from '../credits.service';
import { CreditPdfData, DialogAttachPdfComponent } from '../dialog-attach-pdf/dialog-attach-pdf.component';

@Component({
  selector: 'app-edit-credits',
  templateUrl: './edit-credits.component.html',
  styleUrls: ['./edit-credits.component.sass']
})
export class EditCreditsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly creditsService: CreditsService,
    private readonly navigationService: NavigationService,
    private readonly workersService: WorkersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly matDialog: MatDialog,
    private readonly location: Location,
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    partnership: this.formBuilder.group({
      name: null,
      _id: null,
    }),
    financier: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    customer: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    worker: this.formBuilder.group({
      _id: [ null, Validators.required ]
    }),
    credit: this.formBuilder.group({
      days: [null, Validators. required ],
      emitionAt: [ null, Validators.required ],
      prima: [ null, Validators.required ],
      commission: [ null, Validators.required ],
      charge: [ null, Validators.required ],
    }),
  });

  public construction: ConstructionModel|null = null;
  public isLoading: boolean = false;
  public workers: WorkerModel[] = [];
  private creditId: string = '';

  private workers$: Subscription = new Subscription;

  ngOnDestroy() {
    this.workers$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.backTo();
    
    this.workers$ = this.workersService.getWorkers().subscribe(workers => {
      this.workers = workers;
    });
    
    this.route.params.subscribe(params => {
      this.creditId = params.creditId;
      this.navigationService.setTitle('Editar linea de credito');
      this.creditsService.getCreditById(this.creditId).subscribe(credit => {
        console.log(credit);
        const { partnership, customer, financier } = credit;
        this.formGroup.get('partnership')?.patchValue(partnership || {});
        this.formGroup.get('customer')?.patchValue(customer);
        this.formGroup.get('financier')?.patchValue(financier);
        this.formGroup.get('credit')?.patchValue(credit);
        this.formGroup.get('worker')?.patchValue({ _id: credit.workerId });
      });
    });
  }

  openDialogCustomer() {
    const dialogRef = this.matDialog.open(DialogCustomersComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(customer => {
      this.formGroup.patchValue({ customer: customer || {} });
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
        const { customer } = partnership;
        this.formGroup.patchValue({ customer: customer || {} });
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
      const { customer, financier, partnership, worker, credit } = this.formGroup.value;
      credit.customerId = customer._id;
      credit.financierId = financier._id;
      credit.partnershipId = partnership._id;
      credit.workerId = worker._id;
      this.navigationService.loadBarStart();
      this.creditsService.update(credit, this.creditId).subscribe(() => {
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
