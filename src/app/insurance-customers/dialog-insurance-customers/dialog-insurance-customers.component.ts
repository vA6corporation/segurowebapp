import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerModel } from 'src/app/customers/customer.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { InsuranceCustomersService } from '../insurance-customers.service';

@Component({
  selector: 'app-dialog-insurance-customers',
  templateUrl: './dialog-insurance-customers.component.html',
  styleUrls: ['./dialog-insurance-customers.component.sass']
})
export class DialogInsuranceCustomersComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly customersService: InsuranceCustomersService,
    private readonly navigationService: NavigationService,
  ) { }

  public customers: CustomerModel[] = [];
  public formGroup: FormGroup = this.formBuilder.group({
    key: [ null, Validators.required ],
  });

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const key = this.formGroup.get('key')?.value;
      this.formGroup.reset();
      this.customersService.getCustomersByKey(key).subscribe(customers => {
        this.navigationService.loadBarFinish();
        this.customers = customers;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
