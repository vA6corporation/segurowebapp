import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogCustomersComponent } from 'src/app/customers/dialog-customers/dialog-customers.component';
import { DialogFinanciersComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { CompliancesService } from '../compliances.service';
import { DialogChequesComponent } from 'src/app/cheques/dialog-cheques/dialog-cheques.component';
import { DialogDepositsComponent } from 'src/app/deposits/dialog-deposits/dialog-deposits.component';
import { Cheque } from 'src/app/cheques/cheque.model';
import { Deposit } from 'src/app/deposits/deposit.model';

@Component({
  selector: 'app-create-compliances',
  templateUrl: './create-compliances.component.html',
  styleUrls: ['./create-compliances.component.sass']
})
export class CreateCompliancesComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly compliancesService: CompliancesService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    private readonly matDialog: MatDialog
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
      policyNumber: [ null, Validators.required ],
      object: [ null, Validators.required ],
      price: [ null, Validators.required ],
      startDate: [ null, Validators.required ],
      endDate: [ null, Validators.required ],
      guarantee: null,
    }),
  });

  public isLoading: boolean = false;
  public deposits: Deposit[] = [];
  public cheques: Cheque[] = [];

  ngOnInit(): void {
    this.navigationService.backTo();
    this.navigationService.setTitle('Nuevo fiel cumplimiento');
  }

  removeCheque(index: number): void {
    this.cheques.splice(index, 1);
  }

  removeDeposit(index: number): void {
    this.deposits.splice(index, 1);
  }

  openDialogCustomers() {
    const dialogRef = this.matDialog.open(DialogCustomersComponent, {
      height: '400px',
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(customer => {
      this.formGroup.patchValue({ customer: customer || {} });
    });
  }

  openDialogFinanciers() {
    const dialogRef = this.matDialog.open(DialogFinanciersComponent, {
      height: '400px',
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(financier => {
      this.formGroup.patchValue({ financier: financier || {} });
    });
  }

  openDialogBeneficiaries() {
    const dialogRef = this.matDialog.open(DialogBeneficiariesComponent, {
      height: '400px',
      width: '600px',
      position: { top: '20px' }
    });
    
    dialogRef.afterClosed().subscribe(beneficiary => {
      this.formGroup.patchValue({ beneficiary: beneficiary || {} });
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
      this.compliancesService.create(compliance, this.cheques, this.deposits).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.router.navigate(['/compliances']);
        this.navigationService.showMessage('Registrado correctamente');
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }
}
