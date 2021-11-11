import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from 'src/app/customers/customer.model';
import { CustomersService } from 'src/app/customers/customers.service';
import { NavigationService } from 'src/app/navigation/navigation.service';

@Component({
  selector: 'app-dialog-customers',
  templateUrl: './dialog-customers.component.html',
  styleUrls: ['./dialog-customers.component.sass']
})
export class DialogCustomersComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customersService: CustomersService,
    private readonly navigationService: NavigationService,
  ) { }

  public customers: Customer[] = [];
  public formGroup: FormGroup = this.formBuilder.group({
    key: [ null, Validators.required ],
  });

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const key = this.formGroup.get('key')?.value;
      this.formGroup.reset();
      this.customersService.getCustomersByAny(key).subscribe(customers => {
        this.navigationService.loadBarFinish();
        this.customers = customers;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
