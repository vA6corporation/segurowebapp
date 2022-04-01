import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerModel } from 'src/app/customers/customer.model';
import { DialogInsuranceCustomersComponent } from 'src/app/insurance-customers/dialog-insurance-customers/dialog-insurance-customers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { InsurancePartnershipsService } from '../insurance-partnerships.service';

@Component({
  selector: 'app-create-insurance-partnerships',
  templateUrl: './create-insurance-partnerships.component.html',
  styleUrls: ['./create-insurance-partnerships.component.sass']
})
export class CreateInsurancePartnershipsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly partnershipsService: InsurancePartnershipsService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    private readonly matDialog: MatDialog,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    partnership: this.formBuilder.group({
      document: null,
      name: [ null, Validators.required ],
      address: [ null ],
      representative: [ null, Validators.required ],
      representativeDocument: [ null, Validators.required ],
      customerId: [ null, Validators.required ],
    }),
  });
  public isLoading: boolean = false;
  public customers: CustomerModel[] = [];
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Nuevo consorcio');
    this.navigationService.backTo();
  }

  openDialogCustomer(): void {
    const dialogRef = this.matDialog.open(DialogInsuranceCustomersComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(customer => {
      if (customer) {
        this.customers.push(customer);
      }
    });
  }

  removeCustomerModel(index: number): void {
    this.customers.splice(index, 1);
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { partnership } = this.formGroup.value;
      partnership.customerIds = this.customers.map(e => e._id);
      this.partnershipsService.create(partnership).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.router.navigate(['/insurancePartnerships']);
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
