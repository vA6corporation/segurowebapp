import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePaymentOrdersComponent } from './create-payment-orders/create-payment-orders.component';
import { EditPaymentOrdersComponent } from './edit-payment-orders/edit-payment-orders.component';
import { PaymentOrdersComponent } from './payment-orders/payment-orders.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: '', component: PaymentOrdersComponent },
  { path: 'create', component: CreatePaymentOrdersComponent },
  { path: ':paymentOrderId/edit', component: EditPaymentOrdersComponent },
  { path: 'report', component: ReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentOrdersRoutingModule { }
