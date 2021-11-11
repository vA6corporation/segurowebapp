import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogCustomersComponent } from 'src/app/customers/dialog-customers/dialog-customers.component';
import { DialogFinanciersComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { CompliancesService } from '../compliances.service';
import { Cheque } from 'src/app/cheques/cheque.model';
import { Deposit } from 'src/app/deposits/deposit.model';
import { DialogChequesComponent } from 'src/app/cheques/dialog-cheques/dialog-cheques.component';
import { DialogDepositsComponent } from 'src/app/deposits/dialog-deposits/dialog-deposits.component';
import { ChequesService } from 'src/app/cheques/cheques.service';
import { DepositsService } from 'src/app/deposits/deposits.service';

@Component({
  selector: 'app-edit-compliances',
  templateUrl: './edit-compliances.component.html',
  styleUrls: ['./edit-compliances.component.sass']
})
export class EditCompliancesComponent implements OnInit {

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
    customer: this.formBuilder.group({
      _id: [ null, Validators.required ],
      name: [ null, Validators.required ],
    }),
    financier: this.formBuilder.group({
      _id: [ null, Validators.required ],
      name: [ null, Validators.required ],
    }),
    beneficiary: this.formBuilder.group({
      _id: [ null, Validators.required ],
      name: [ null, Validators.required ],
    }),
    partnership: this.formBuilder.group({
      _id: null,
      name: null,
    }),
    compliance: this.formBuilder.group({
      _id: [ null, Validators.required ],
      policyNumber: [ null, Validators.required ],
      object: [ null, Validators.required ],
      price: [ null, Validators.required ],
      startDate: [ null, Validators.required ],
      endDate: [ null, Validators.required ],
      guarantee: null,
    }),
  });

  public isLoading: boolean = false;
  private complianceId: string = '';
  public deposits: Deposit[] = [];
  public cheques: Cheque[] = [];

  ngOnInit(): void { 
    this.navigationService.backTo();
    this.navigationService.setTitle('Editar fiel cumplimiento');
    this.route.params.subscribe(params => {
      this.complianceId = params.complianceId;
      this.compliancesService.getComplianceById(this.complianceId).subscribe(compliance => {
        console.log(compliance);
        const { customer, financier, beneficiary, partnership, cheques = [], deposits = [] } = compliance;
        this.formGroup.patchValue({ customer });
        this.formGroup.patchValue({ financier });
        this.formGroup.patchValue({ beneficiary });
        this.formGroup.patchValue({ partnership: partnership || {} });
        this.formGroup.patchValue({ compliance });
        this.cheques = cheques;
        this.deposits = deposits;
      });
    });
  }

  removeCheque(index: number): void {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      const cheque = this.cheques[index];
      this.cheques.splice(index, 1);
      this.chequesService.deleteOne(cheque._id || '').toPromise();
      this.navigationService.showMessage('Se han guardado los cambios');
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
      height: '400px',
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
      height: '400px',
      width: '600px',
      position: { top: '20px' },
      data: cheque,
    });

    dialogRef.afterClosed().subscribe(async updatedCheque => {
      if (updatedCheque) {
        Object.assign(cheque, updatedCheque);
        await this.chequesService.update(updatedCheque, updatedCheque._id).toPromise();
        this.navigationService.showMessage('Se han guardado los cambios');
      }
    });
  }

  openDialogCustomers() {
    const dialogRef = this.matDialog.open(DialogCustomersComponent, {
      height: '400px',
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
    const dialogRef = this.matDialog.open(DialogFinanciersComponent, {
      height: '400px',
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
      height: '400px',
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
      height: '400px',
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(partnership => {
      const { customer } = partnership;
      this.formGroup.patchValue({ customer: customer || {} });
      this.formGroup.patchValue({ partnership: partnership || {} });
    });
  }

  openDialogCheques() {
    const dialogRef = this.matDialog.open(DialogChequesComponent, {
      height: '400px',
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(cheque => {
      if (cheque) {
        this.cheques.push(cheque);
        cheque.onModel = 'Compliance';
        cheque.guaranteeId = this.complianceId;
        this.chequesService.create(cheque).toPromise();
        this.navigationService.showMessage('Se han guardado los cambios');
      }
    });
  }

  openDialogDeposits() {
    const dialogRef = this.matDialog.open(DialogDepositsComponent, {
      height: '400px',
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
      const { customer, financier, beneficiary, partnership, compliance } = this.formGroup.value;
      compliance.customerId = customer._id;
      compliance.financierId = financier._id;
      compliance.beneficiaryId = beneficiary._id;
      compliance.partnershipId = partnership._id;
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

}
