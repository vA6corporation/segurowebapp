import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments/payments.component';
import { DialogPaymentsComponent } from './dialog-payments/dialog-payments.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogCreatePaymentsComponent } from './dialog-create-payments/dialog-create-payments.component';


@NgModule({
  declarations: [
    PaymentsComponent,
    DialogPaymentsComponent,
    DialogCreatePaymentsComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PaymentsModule { }
