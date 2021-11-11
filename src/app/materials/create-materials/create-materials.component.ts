import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaterialsService } from '../materials.service';
import { DialogCustomersComponent } from 'src/app/customers/dialog-customers/dialog-customers.component';
import { DialogFinanciersComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { Deposit } from 'src/app/deposits/deposit.model';
import { Cheque } from 'src/app/cheques/cheque.model';
import { DialogChequesComponent } from 'src/app/cheques/dialog-cheques/dialog-cheques.component';
import { DialogDepositsComponent } from 'src/app/deposits/dialog-deposits/dialog-deposits.component';

@Component({
  selector: 'app-create-materials',
  templateUrl: './create-materials.component.html',
  styleUrls: ['./create-materials.component.sass']
})
export class CreateMaterialsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly materialsService: MaterialsService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    private readonly matDialog: MatDialog
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
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
      guarantee: null,
    }),
  });

  public isLoading: boolean = false;
  public deposits: Deposit[] = [];
  public cheques: Cheque[] = [];

  ngOnInit(): void {
    this.navigationService.setTitle('Nuevo adelanto de materiales');
    this.navigationService.backTo();
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
      const { customer, financier, beneficiary, partnership, material } = this.formGroup.value;
      material.customerId = customer._id;
      material.financierId = financier._id;
      material.beneficiaryId = beneficiary._id;
      material.partnershipId = partnership._id;
      this.materialsService.create(material, this.cheques, this.deposits).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.router.navigate(['/materials']);
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