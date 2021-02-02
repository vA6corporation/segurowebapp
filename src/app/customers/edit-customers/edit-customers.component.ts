import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LoadScreenService } from 'src/app/navigation/loadScreen.service';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.sass']
})
export class EditCustomersComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private customersService: CustomersService,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private loadScreenService: LoadScreenService,
  ) {
    this.customerForm = this.formBuilder.group({
      typeDocument: [ null, Validators.required ],
      document: [ null, Validators.required ],
      name: [ null, Validators.required ],
      email: [ null, [ Validators.required, Validators.email ] ],
      phoneNumber: [ null, [Validators.required, Validators.minLength(9)] ],
      businessId: [null, Validators.required],
    });
  
    this.customerForm.controls.typeDocument.valueChanges.subscribe(value => {
      switch (value) {
        case 'RUC':
          this.customerForm.controls.document.setValidators([ Validators.required, Validators.minLength(11), Validators.maxLength(11) ]);
          break;
        case 'DNI':
          this.customerForm.controls.document.setValidators([ Validators.required, Validators.minLength(8), Validators.maxLength(8) ]);
          break;
        default:
          this.customerForm.controls.document.setValidators([ Validators.required ]);
          break;
      }
      this.customerForm.controls.document.updateValueAndValidity();
    });
  
    this.activatedRoute.params.subscribe(async params => {
      this.customerId = params.customerId;
      this.customersService.getCustomerById(this.customerId).subscribe(customer => {
        console.log(customer);
        this.customerForm.controls.typeDocument.setValue(customer.typeDocument);
        this.customerForm.controls.document.setValue(customer.document);
        this.customerForm.controls.name.setValue(customer.name);
        this.customerForm.controls.email.setValue(customer.email);
        this.customerForm.controls.phoneNumber.setValue(customer.phoneNumber);
        this.customerForm.controls.businessId.setValue(customer.businessId);
      });
    });
  }
    
  public customerForm: FormGroup;
  private customerId: string = '';
  public isLoading: boolean = false;

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.isLoading = true;
      this.loadScreenService.loadStart();
      this.customersService.update(this.customerForm.value, this.customerId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.loadScreenService.loadFinish();
        this.matSnackBar.open('Se han guardado los cambios', 'Aceptar', {
          duration: 5000,
        });
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.loadScreenService.loadFinish();
        this.matSnackBar.open(error.error.message, 'Aceptar', {
          duration: 5000,
        });
      });
    }
  }
}
