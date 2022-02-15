import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.sass']
})
export class EditCustomersComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customersService: CustomersService,
    private readonly navigationService: NavigationService,
    private readonly route: ActivatedRoute,
  ) { }
  
  public formGroup: FormGroup = this.formBuilder.group({
    customer: this.formBuilder.group({
      _id: [ null ],
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
  });

  private customerId: string = '';
  public isLoading: boolean = false;
  public maxlength: number = 11;

  ngOnInit(): void { 
    this.navigationService.setTitle('Editar cliente');
    this.navigationService.backTo();
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

    this.route.params.subscribe(params => {
      this.customerId = params.customerId;
      this.customersService.getCustomerById(this.customerId).subscribe(customer => {
        console.log(customer);
        this.formGroup.get('customer')?.setValue(customer);
      });
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { customer } = this.formGroup.value;
      this.customersService.update(customer, this.customerId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Registrado correctamente');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }
}
