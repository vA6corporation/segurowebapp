import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/customers/customers.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { InsuranceCustomersService } from '../insurance-customers.service';

@Component({
  selector: 'app-create-insurance-customers',
  templateUrl: './create-insurance-customers.component.html',
  styleUrls: ['./create-insurance-customers.component.sass']
})
export class CreateInsuranceCustomersComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customersService: InsuranceCustomersService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    customer: this.formBuilder.group({
      typeDocument: [ null, Validators.required ],
      document: [ null, Validators.required ],
      name: [ null, Validators.required ],
      email: [ null, [ Validators.required, Validators.email ] ],
      mobileNumber: null,
      phoneNumber: null,
      annexed: null,
      birthDate: null,
      address: null,
      representative: null,
      representativeDocument: null,
    }),
    partnership: this.formBuilder.group({
      _id: [ null ],
      name: [ null ],
    }),
  });

  public isLoading: boolean = false;
  public maxlength: number = 11;
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Nuevo Cliente');
    this.formGroup.get('customer.typeDocument')?.valueChanges.subscribe(value => {
      switch (value) {
        case 'RUC':
          this.formGroup.get('customer.documento')?.setValidators([ Validators.required, Validators.minLength(11), Validators.maxLength(11) ]);
          this.maxlength = 11;
          break;
        case 'DNI':
          this.formGroup.get('customer.documento')?.setValidators([ Validators.required, Validators.minLength(8), Validators.maxLength(8) ]);
          this.maxlength = 8;
          break;
      }
      this.formGroup.get('customer.documento')?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { customer, partnership } = this.formGroup.value;
      customer.partnershipId = partnership._id;
      this.customersService.create(customer).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.router.navigate(['/insuranceCustomers']);
        this.navigationService.showMessage('Registrador correctamente');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }


}
