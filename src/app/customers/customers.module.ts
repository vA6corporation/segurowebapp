import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { CreateCustomersComponent } from './create-customers/create-customers.component';
import { EditCustomersComponent } from './edit-customers/edit-customers.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogCustomersComponent } from './dialog-customers/dialog-customers.component';


@NgModule({
  declarations: [
    CustomersComponent,
    CreateCustomersComponent,
    EditCustomersComponent,
    DialogCustomersComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class CustomersModule { }
