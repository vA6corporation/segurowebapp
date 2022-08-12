import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { Cheque } from 'src/app/cheques/cheque.model';
import { ChequesService } from 'src/app/cheques/cheques.service';
import { DialogChequesComponent } from 'src/app/cheques/dialog-cheques/dialog-cheques.component';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { DialogAttachPdfComponent } from 'src/app/constructions/dialog-attach-pdf/dialog-attach-pdf.component';
import { DialogConstructionsComponent } from 'src/app/constructions/dialog-constructions/dialog-constructions.component';
import { CustomerModel } from 'src/app/customers/customer.model';
import { DialogCustomersComponent } from 'src/app/customers/dialog-customers/dialog-customers.component';
import { Deposit } from 'src/app/deposits/deposit.model';
import { DepositsService } from 'src/app/deposits/deposits.service';
import { DialogDepositsComponent } from 'src/app/deposits/dialog-deposits/dialog-deposits.component';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
import { CompliancesService } from '../compliances.service';
import { CompliancePdfData, DialogPdfCompliancesComponent } from '../dialog-pdf-compliances/dialog-pdf-compliances.component';

@Component({
  selector: 'app-edit-commercials',
  templateUrl: './edit-commercials.component.html',
  styleUrls: ['./edit-commercials.component.sass']
})
export class EditCommercialsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly compliancesService: CompliancesService,
    private readonly chequesService: ChequesService,
    private readonly depositsService: DepositsService,
    private readonly navigationService: NavigationService,
    private readonly route: ActivatedRoute,
    private readonly matDialog: MatDialog,
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    financier: this.formBuilder.group({
      _id: [ null, Validators.required ],
      name: [ null, Validators.required ],
    }),
    beneficiary: this.formBuilder.group({
      _id: [ null, Validators.required ],
      name: [ null, Validators.required ],
    }),
    compliance: this.formBuilder.group({
      constructionId: '',
      _id: [ null, Validators.required ],
      policyNumber: [ null, Validators.required ],
      object: null,
      price: [ null, Validators.required ],
      startDate: [ null, Validators.required ],
      endDate: [ null, Validators.required ],
      guarantee: null,
      prima: null,
      isEmition: false,
      commission: null,
      currency: 'PEN',
    }),
  });

  public construction: ConstructionModel|null = null;
  public customer: CustomerModel|null = null;
  public partnership: PartnershipModel|null = null;
  public isLoading: boolean = false;
  private complianceId: string = '';
  public deposits: Deposit[] = [];
  public cheques: Cheque[] = [];
  // public workers: WorkerModel[] = [];

  // private workers$: Subscription = new Subscription();

  // ngOnDestroy() {
  //   this.workers$.unsubscribe();
  // }

  ngOnInit(): void { 
    this.navigationService.backTo();
    this.navigationService.setTitle('Editar fiel cumplimiento');
    this.route.params.subscribe(params => {
      this.complianceId = params.complianceId;
      this.compliancesService.getComplianceById(this.complianceId).subscribe(compliance => {
        console.log(compliance);
        const { customer, financier, beneficiary, partnership, cheques = [], deposits = [], construction } = compliance;
        this.formGroup.patchValue({ customer });
        this.formGroup.patchValue({ financier });
        this.formGroup.patchValue({ beneficiary });
        this.formGroup.patchValue({ partnership: partnership || {} });
        this.formGroup.patchValue({ compliance });
        this.construction = construction;
        this.customer = construction?.customer || null;
        this.partnership = construction?.partnership || null;
        this.cheques = cheques;
        this.deposits = deposits;
      });
    });

    // this.workers$ = this.workersService.getWorkers().subscribe(workers => {
    //   this.workers = workers;
    // });
  }

  onEditConstruction() {
    const dialogRef = this.matDialog.open(DialogConstructionsComponent, {
      width: '100vw',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(construction => {
      console.log(construction);
      
      if (construction) {
        this.construction = construction;
        this.formGroup.patchValue({ compliance: { constructionId: construction._id } });
      }
    });
  }

  removeCheque(index: number): void {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      const cheque = this.cheques[index];
      this.chequesService.deleteOne(cheque._id).subscribe(() => {
        this.cheques.splice(index, 1);
        this.navigationService.showMessage('Eliminado correctamente');
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

  removeDeposit(index: number): void {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      const deposit = this.deposits[index];
      this.deposits.splice(index, 1);
      this.depositsService.deleteOne(deposit._id || '').toPromise();
      this.navigationService.showMessage('Se han guardado los cambios');
    }
  }

  onEditDeposit(deposit: Deposit): void {
    const dialogRef = this.matDialog.open(DialogDepositsComponent, {
      width: '600px',
      position: { top: '20px' },
      data: deposit,
    });

    dialogRef.afterClosed().subscribe(async updatedDeposit => {
      if (updatedDeposit) {
        Object.assign(deposit, updatedDeposit);
        await this.depositsService.update(updatedDeposit, updatedDeposit._id).toPromise();
        this.navigationService.showMessage('Se han guardado los cambios');
      }
    });
  }

  onEditCheque(cheque: Cheque): void {
    const dialogRef = this.matDialog.open(DialogChequesComponent, {
      width: '600px',
      position: { top: '20px' },
      data: cheque,
    });

    dialogRef.afterClosed().subscribe(async updatedCheque => {
      if (updatedCheque) {
        Object.assign(cheque, updatedCheque);
        await this.chequesService.update(updatedCheque, cheque._id).toPromise();
        this.navigationService.showMessage('Se han guardado los cambios');
      }
    });
  }

  openDialogCustomer() {
    const dialogRef = this.matDialog.open(DialogCustomersComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(customer => {
      if (customer) {
        this.formGroup.patchValue({ customer });
      }
    });
  }

  openDialogFinanciers() {
    const dialogRef = this.matDialog.open(DialogFinanciesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(financier => {
      if (financier) {
        this.formGroup.patchValue({ financier });
      }
    });
  }

  openDialogBeneficiaries() {
    const dialogRef = this.matDialog.open(DialogBeneficiariesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(beneficiary => {
      if (beneficiary) {
        this.formGroup.patchValue({ beneficiary });
      }
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

  // openDialogCheques() {
  //   const dialogRef = this.matDialog.open(DialogChequesComponent, {
  //     width: '600px',
  //     position: { top: '20px' }
  //   });

  //   dialogRef.afterClosed().subscribe(cheque => {
  //     if (cheque) {
  //       cheque.onModel = 'Compliance';
  //       cheque.guaranteeId = this.complianceId;
  //       this.chequesService.create(cheque).subscribe(cheque => {
  //         this.cheques.push(cheque);
  //         this.navigationService.showMessage('Se han guardado los cambios');
  //       });
  //     }
  //   });
  // }

  openDialogDeposits() {
    const dialogRef = this.matDialog.open(DialogDepositsComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(deposit => {
      if (deposit) {
        this.deposits.push(deposit);
        deposit.onModel = 'Compliance';
        deposit.guaranteeId = this.complianceId;
        this.depositsService.create(deposit).toPromise();
        this.navigationService.showMessage('Se han guardado los cambios');
      }
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { financier, beneficiary, compliance } = this.formGroup.value;
      // compliance.customerId = customer._id;
      // compliance.partnershipId = partnership._id;
      compliance.financierId = financier._id;
      compliance.beneficiaryId = beneficiary._id;
      this.compliancesService.update(compliance, this.complianceId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

  onAttachPdfInvoice() {
    const data: CompliancePdfData = {
      type: 'invoice',
      complianceId: this.complianceId
    }

    this.matDialog.open(DialogPdfCompliancesComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfTicket() {
    const data: CompliancePdfData = {
      type: 'voucher',
      complianceId: this.complianceId
    }

    this.matDialog.open(DialogPdfCompliancesComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfDocuments() {
    const data: CompliancePdfData = {
      type: 'document',
      complianceId: this.complianceId
    }

    this.matDialog.open(DialogPdfCompliancesComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfCheques() {
    const data: CompliancePdfData = {
      type: 'cheque',
      complianceId: this.complianceId
    }

    this.matDialog.open(DialogPdfCompliancesComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfDeposits() {
    const data: CompliancePdfData = {
      type: 'deposit',
      complianceId: this.complianceId
    }

    this.matDialog.open(DialogPdfCompliancesComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfFianzas() {
    const data: CompliancePdfData = {
      type: 'fianza',
      complianceId: this.complianceId
    }

    this.matDialog.open(DialogPdfCompliancesComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfConstruction() {
    this.matDialog.open(DialogAttachPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data: this.construction?._id,
    });
  }

  onAttachPdfConstructions() {
    const data: CompliancePdfData = {
      type: 'construction',
      complianceId: this.complianceId
    }

    this.matDialog.open(DialogPdfCompliancesComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }


}
