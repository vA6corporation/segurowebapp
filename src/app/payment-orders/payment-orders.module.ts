import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentOrdersRoutingModule } from './payment-orders-routing.module';
import { PaymentOrdersComponent } from './payment-orders/payment-orders.component';
import { CreatePaymentOrdersComponent } from './create-payment-orders/create-payment-orders.component';
import { EditPaymentOrdersComponent } from './edit-payment-orders/edit-payment-orders.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SystemModule } from '../system/system.module';
import { ReportComponent } from './report/report.component';
import { DialogAttachPdfComponent } from './dialog-attach-pdf/dialog-attach-pdf.component';


@NgModule({
  declarations: [
    PaymentOrdersComponent,
    CreatePaymentOrdersComponent,
    EditPaymentOrdersComponent,
    ReportComponent,
    DialogAttachPdfComponent,
  ],
  imports: [
    CommonModule,
    PaymentOrdersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SystemModule,
  ]
})
export class PaymentOrdersModule { }
