import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBeneficiariesComponent } from 'src/app/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogCustomersComponent } from 'src/app/dialog-customers/dialog-customers.component';
import { DialogFinanciersComponent } from 'src/app/dialog-financiers/dialog-financiers.component';
import { DialogPartnershipsComponent } from 'src/app/dialog-partnerships/dialog-partnerships.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { MaterialsService } from '../materials.service';

@Component({
  selector: 'app-edit-materials',
  templateUrl: './edit-materials.component.html',
  styleUrls: ['./edit-materials.component.sass']
})
export class EditMaterialsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private materialsService: MaterialsService,
    private matSnackBar: MatSnackBar,
    private navigationService: NavigationService,
    private activatedRoute: ActivatedRoute,
    public matDialog: MatDialog
  ) {
    this.formGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        name: [ null, Validators.required ],
        _id: [ null, Validators.required ],
      }),
      financier: this.formBuilder.group({
        name: [ null, Validators.required ],
        _id: [ null, Validators.required ],
      }),
      beneficiary: this.formBuilder.group({
        name: [ null, Validators.required ],
        _id: [ null, Validators.required ],
      }),
      partnership: this.formBuilder.group({
        _id: null,
        name: null,
      }),
      material: this.formBuilder.group({
        policyNumber: [ null, Validators.required ],
        object: [ null, Validators.required ],
        price: [ null, Validators.required ],
        startDate: [null, Validators. required ],
        endDate: [ null, Validators.required ],
      }),
    });

    this.activatedRoute.params.subscribe(params => {
      this.materialId = params.materialId;
      this.materialsService.getMaterialById(this.materialId).subscribe(material => {
        console.log(material);
        const { customer, financier, beneficiary, partnership } = material;
        this.formGroup.patchValue({ customer });
        this.formGroup.patchValue({ financier });
        this.formGroup.patchValue({ beneficiary });
        this.formGroup.patchValue({ partnership: partnership || {} });
        this.formGroup.patchValue({ material });
      });
    });
  }

  public formGroup: FormGroup;
  public isLoading: boolean = false;
  private materialId: string = '';

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
      const { customer, financier, beneficiary, partnership, material } = this.formGroup.value;
      material.customerId = customer._id;
      material.financierId = financier._id;
      material.beneficiaryId = beneficiary._id;
      material.partnershipId = partnership._id;
      this.materialsService.update(material, this.materialId).subscribe(res => {
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
