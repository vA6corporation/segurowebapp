import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogBeneficiariesComponent } from 'src/app/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogCustomersComponent } from 'src/app/dialog-customers/dialog-customers.component';
import { DialogFinanciersComponent } from 'src/app/dialog-financiers/dialog-financiers.component';
import { DialogPartnershipsComponent } from 'src/app/dialog-partnerships/dialog-partnerships.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { CompliancesService } from '../compliances.service';

@Component({
  selector: 'app-create-compliances',
  templateUrl: './create-compliances.component.html',
  styleUrls: ['./create-compliances.component.sass']
})
export class CreateCompliancesComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private compliancesService: CompliancesService,
    private matSnackBar: MatSnackBar,
    private navigationService: NavigationService,
    private router: Router,
    public matDialog: MatDialog
  ) { 
    this.formGroup = this.formBuilder.group({
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
      }),
    });
  }

  public formGroup: FormGroup;
  public isLoading: boolean = false;

  ngOnInit(): void { }

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
      this.formGroup.patchValue({ partnership: partnership || {} });
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadSpinnerStart();
      const { customer, financier, beneficiary, partnership, compliance } = this.formGroup.value;
      compliance.customerId = customer._id;
      compliance.financierId = financier._id;
      compliance.beneficiaryId = beneficiary._id;
      compliance.partnershipId = partnership._id;
      this.compliancesService.create(compliance).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.router.navigate(['/compliances']);
        this.matSnackBar.open('Registrado correctamente', 'Aceptar', {
          duration: 5000,
        });
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.matSnackBar.open(error.error.message, 'Aceptar', {
          duration: 5000,
        });
      });
    }
  }
}
