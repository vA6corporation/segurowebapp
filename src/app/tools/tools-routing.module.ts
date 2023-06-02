import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentOrdersComponent } from './payment-orders/payment-orders.component';

const routes: Routes = [
  { path: 'paymentOrders', component: PaymentOrdersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
