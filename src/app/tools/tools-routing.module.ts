import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentOrdersComponent } from './payment-orders/payment-orders.component';
import { ImportPaymentsComponent } from './import-payments/import-payments.component';

const routes: Routes = [
  { path: 'paymentOrders', component: PaymentOrdersComponent },
  { path: 'importPayments', component: ImportPaymentsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
