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
import { DialogInsurancePartnershipsComponent } from 'src/app/insurance-partnerships/dialog-insurance-partnerships/dialog-insurance-partnerships.component';
import { DialogInsuranceConstructionsComponent } from 'src/app/insurance-constructions/dialog-insurance-constructions/dialog-insurance-constructions.component';
import { OfficeModel } from 'src/app/auth/office.model';
import { OfficesService } from 'src/app/offices/offices.service';
import { DialogInsuranceBusinessesComponent } from 'src/app/insurance-businesses/dialog-insurance-businesses/dialog-insurance-businesses.component';

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
    private readonly officesService: OfficesService,
    private readonly route: ActivatedRoute,
    private readonly matDialog: MatDialog,
    private readonly location: Location,
    private readonly router: Router,
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    construction: this.formBuilder.group({
      object: null,
      _id: null,
    }),
    partnership: this.formBuilder.group({
      _id: null,
      name: null,
    }),
    business: this.formBuilder.group({
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
      currency: 'PEN',
      isPaid: false,
      isEmition: false,
      officeId: '',
    }),
  });

  public construction: ConstructionModel|null = null;
  public isLoading: boolean = false;
  public workers: WorkerModel[] = [];
  public offices: OfficeModel[] = [];
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

    this.officesService.getActiveOffices().subscribe(offices => {
      this.offices = offices;
    });
    
    this.route.params.subscribe(params => {
      this.insuranceId = params.insuranceId;
      this.navigationService.setTitle('Editar seguro');
      this.insurancesService.getInsuranceById(this.insuranceId).subscribe(insurance => {
        console.log(insurance);
        const { broker, business, financier, construction } = insurance;
        this.formGroup.get('construction')?.patchValue(construction || {});
        this.formGroup.get('broker')?.patchValue(broker);
        this.formGroup.get('business')?.patchValue(business);
        this.formGroup.get('financier')?.patchValue(financier);
        this.formGroup.get('insurance')?.patchValue(insurance);
        this.formGroup.get('worker')?.patchValue({ _id: insurance.workerId });
      });
    });
  }

  onChangeOffice() {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const { insurance } = this.formGroup.value;
      this.insurancesService.updateOffice(this.insuranceId, insurance.officeId).subscribe(() => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

  openDialogConstruction() {
    const dialogRef = this.matDialog.open(DialogInsuranceConstructionsComponent, {
      width: '100vw',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(construction => {
      if (construction) {
        this.formGroup.patchValue({ construction });
      }
    });
  }

  openDialogBusinesses() {
    const dialogRef = this.matDialog.open(DialogInsuranceBusinessesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(business => {
      if (business) {
        this.formGroup.patchValue({ business });
      }
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
        const { business } = partnership;
        this.formGroup.patchValue({ business: business || {} });
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
      const { business, financier, broker, worker, insurance, partnership, construction } = this.formGroup.value;
      insurance.constructionId = construction?._id || null;
      insurance.partnershipId = partnership?._id || null,
      insurance.businessId = business._id;
      insurance.financierId = financier._id;
      insurance.brokerId = broker._id;
      insurance.workerId = worker._id;
      this.insurancesService.update(insurance, this.insuranceId).subscribe(res => {
        this.navigationService.loadBarFinish();
        console.log(res);
        this.isLoading = false;
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