import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceCustomersRoutingModule } from './insurance-customers-routing.module';
import { InsuranceCustomersComponent } from './insurance-customers/insurance-customers.component';
import { CreateInsuranceCustomersComponent } from './create-insurance-customers/create-insurance-customers.component';
import { EditInsuranceCustomersComponent } from './edit-insurance-customers/edit-insurance-customers.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogInsuranceCustomersComponent } from './dialog-insurance-customers/dialog-insurance-customers.component';


@NgModule({
  declarations: [InsuranceCustomersComponent, CreateInsuranceCustomersComponent, EditInsuranceCustomersComponent, DialogInsuranceCustomersComponent],
  imports: [
    CommonModule,
    InsuranceCustomersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsuranceCustomersModule { }
