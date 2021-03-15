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
import { DirectsService } from '../directs.service';

@Component({
  selector: 'app-edit-directs',
  templateUrl: './edit-directs.component.html',
  styleUrls: ['./edit-directs.component.sass']
})
export class EditDirectsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private directsService: DirectsService,
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
      direct: this.formBuilder.group({
        _id: [ null, Validators.required ],
        policyNumber: [ null, Validators.required ],
        object: [ null, Validators.required ],
        price: [ null, Validators.required ],
        startDate: [ null, Validators.required ],
        endDate: [ null, Validators.required ],
      }),
    });

    this.activatedRoute.params.subscribe(params => {
      this.directId = params.directId;
      this.directsService.getDirectById(this.directId).subscribe(direct => {
        console.log(direct);
        const { customer, financier, beneficiary, partnership } = direct;
        this.formGroup.patchValue({ customer });
        this.formGroup.patchValue({ financier });
        this.formGroup.patchValue({ beneficiary });
        this.formGroup.patchValue({ partnership: partnership || {} })
        this.formGroup.patchValue({ direct });
      });
    });
  }

  public formGroup: FormGroup;
  public isLoading: boolean = false;
  private directId: string = '';

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
      const { customer, financier, beneficiary, partnership, direct } = this.formGroup.value;
      direct.customerId = customer._id;
      direct.financierId = financier._id;
      direct.beneficiaryId = beneficiary._id;
      direct.partnershipId = partnership._id;
      this.directsService.update(direct, this.directId).subscribe(res => {
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
