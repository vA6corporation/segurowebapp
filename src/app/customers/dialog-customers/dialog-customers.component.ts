import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { CustomerModel } from '../customer.model';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-dialog-customers',
  templateUrl: './dialog-customers.component.html',
  styleUrls: ['./dialog-customers.component.sass']
})
export class DialogCustomersComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly customersService: CustomersService,
    private readonly navigationService: NavigationService,
  ) { }

  customers: CustomerModel[] = [];
  formGroup: UntypedFormGroup = this.formBuilder.group({
    key: [ null, Validators.required ],
  });
  isLoading: boolean = false

  private createCustomer: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void { }

  handleCreateCustomer() {
    return this.createCustomer
  }

  onCreateCustomer() {
    this.createCustomer.next()
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const key = this.formGroup.get('key')?.value;
      this.formGroup.reset();
      this.isLoading = true
      this.customersService.getCustomersByKey(key).subscribe(customers => {
        this.isLoading = false
        this.navigationService.loadBarFinish();
        this.customers = customers;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
