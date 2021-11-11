import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChequesPaymentComponent } from './cheques-payment/cheques-payment.component';
import { ChequesComponent } from './cheques/cheques.component';

const routes: Routes = [
  { path: '', component: ChequesPaymentComponent },
  { path: 'all', component: ChequesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChequesRoutingModule { }
