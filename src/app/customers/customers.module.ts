import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerModelsRoutingModule } from './customers-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerModelsComponent } from './customers/customers.component';
import { CreateCustomerModelsComponent } from './create-customers/create-customers.component';
import { EditCustomerModelsComponent } from './edit-customers/edit-customers.component';
import { DialogCustomersComponent } from './dialog-customers/dialog-customers.component';
import { DialogAttachPdfComponent } from './dialog-attach-pdf/dialog-attach-pdf.component';
import { ConstructionCustomersComponent } from './construction-customers/construction-customers.component';
import { DialogConstructionCustomersComponent } from './dialog-construction-customers/dialog-construction-customers.component';

@NgModule({
  declarations: [
    CustomerModelsComponent,
    CreateCustomerModelsComponent,
    EditCustomerModelsComponent,
    DialogCustomersComponent,
    DialogAttachPdfComponent,
    ConstructionCustomersComponent,
    DialogConstructionCustomersComponent
  ],
  imports: [
    CommonModule,
    CustomerModelsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    DialogCustomersComponent,
  ]
})
export class CustomersModule { }
