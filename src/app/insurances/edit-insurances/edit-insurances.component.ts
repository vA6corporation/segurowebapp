import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogBrokersComponent } from 'src/app/brokers/dialog-brokers/dialog-brokers.component';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { InsurancesService } from '../insurances.service';
import { Location } from '@angular/common'
import { HttpErrorResponse } from '@angular/common/http';
import { DialogAttachPdfComponent, InsurancePdfData } from '../dialog-attach-pdf/dialog-attach-pdf.component';
import { DialogInsuranceCustomersComponent } from 'src/app/insurance-customers/dialog-insurance-customers/dialog-insurance-customers.component';
import { DialogInsurancePartnershipsComponent } from 'src/app/insurance-partnerships/dialog-insurance-partnerships/dialog-insurance-partnerships.component';

@Component({
  selector: 'app-edit-insurances',
  templateUrl: './edit-insurances.component.html',
  styleUrls: ['./edit-insurances.component.sass']
})
export class EditInsurancesComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly insurancesService: InsurancesService,
    private readonly navigationService: NavigationService,
    private readonly workersService: WorkersService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly matDialog: MatDialog,
    private readonly location: Location,
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    partnership: this.formBuilder.group({
      _id: null,
      name: null,
    }),
    customer: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    broker: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    financier: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    worker: this.formBuilder.group({
      _id: [ null, Validators.required ]
    }),
    insurance: this.formBuilder.group({
      policyNumber: [ null, Validators.required ],
      expirationAt: [null, Validators. required ],
      emitionAt: [ null, Validators.required ],
      prima: null,
      commission: null,
      isPaid: false,
      isEmition: false,
    }),
  });

  public construction: ConstructionModel|null = null;
  public isLoading: boolean = false;
  public workers: WorkerModel[] = [];
  private type: string = '';
  private insuranceId: string = '';

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
      // this.type = params.type;
      this.insuranceId = params.insuranceId;
      this.navigationService.setTitle('Editar seguro');
      this.insurancesService.getInsuranceById(this.insuranceId).subscribe(insurance => {
        console.log(insurance);
        const { broker, customer, financier } = insurance;
        this.formGroup.get('broker')?.patchValue(broker);
        this.formGroup.get('customer')?.patchValue(customer);
        this.formGroup.get('financier')?.patchValue(financier);
        this.formGroup.get('insurance')?.patchValue(insurance);
        this.formGroup.get('worker')?.patchValue({ _id: insurance.workerId });
      });
    });
  }

  openDialogCustomer() {
    const dialogRef = this.matDialog.open(DialogInsuranceCustomersComponent, {
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
    const dialogRef = this.matDialog.open(DialogInsurancePartnershipsComponent, {
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

  onAttachPdfPolicy() {
    const data: InsurancePdfData = {
      type: 'POLICY',
      insuranceId: this.insuranceId,
    }

    this.matDialog.open(DialogAttachPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfInvoice() {
    const data: InsurancePdfData = {
      type: 'INVOICE',
      insuranceId: this.insuranceId,
    }

    this.matDialog.open(DialogAttachPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfVoucher() {
    const data: InsurancePdfData = {
      type: 'VOUCHER',
      insuranceId: this.insuranceId,
    }

    this.matDialog.open(DialogAttachPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfDocuments() {
    const data: InsurancePdfData = {
      type: 'DOCUMENT',
      insuranceId: this.insuranceId,
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
      const { customer, financier, broker, worker, insurance, partnership } = this.formGroup.value;
      insurance.customerId = customer._id;
      insurance.financierId = financier._id;
      insurance.brokerId = broker._id;
      insurance.workerId = worker._id;
      insurance.partnershipId = partnership._id,
      // insurance.type = this.type;
      this.insurancesService.update(insurance, this.insuranceId).subscribe(res => {
        this.navigationService.loadBarFinish();
        console.log(res);
        this.isLoading = false;
        // this.location.back();
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
