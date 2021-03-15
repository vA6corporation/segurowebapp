import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DialogBeneficiariesComponent } from 'src/app/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogCustomersComponent } from 'src/app/dialog-customers/dialog-customers.component';
import { DialogFinanciersComponent } from 'src/app/dialog-financiers/dialog-financiers.component';
import { DialogPartnershipsComponent } from 'src/app/dialog-partnerships/dialog-partnerships.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { CompliancesService } from '../compliances.service';

@Component({
  selector: 'app-edit-compliances',
  templateUrl: './edit-compliances.component.html',
  styleUrls: ['./edit-compliances.component.sass']
})
export class EditCompliancesComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private compliancesService: CompliancesService,
    private matSnackBar: MatSnackBar,
    private navigationService: NavigationService,
    private activatedRoute: ActivatedRoute,
    public matDialog: MatDialog,
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
        _id: [ null, Validators.required ],
        policyNumber: [ null, Validators.required ],
        object: [ null, Validators.required ],
        price: [ null, Validators.required ],
        startDate: [ null, Validators.required ],
        endDate: [ null, Validators.required ],
      }),
    });

    this.activatedRoute.params.subscribe(params => {
      this.complianceId = params.complianceId;
      this.compliancesService.getComplianceById(this.complianceId).subscribe(compliance => {
        console.log(compliance);
        const { customer, financier, beneficiary, partnership } = compliance;
        this.formGroup.patchValue({ customer });
        this.formGroup.patchValue({ financier });
        this.formGroup.patchValue({ beneficiary });
        this.formGroup.patchValue({ partnership: partnership || {} });
        this.formGroup.patchValue({ compliance });
      });
    });
  }

  public formGroup: FormGroup;
  public isLoading: boolean = false;
  private complianceId: string = '';

  ngOnInit(): void { }

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
      if (partnership) {
        this.formGroup.patchValue({ partnership });
      }
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
      this.compliancesService.update(compliance, this.complianceId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.matSnackBar.open('Se han guardado los cambios', 'Aceptar', {
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
