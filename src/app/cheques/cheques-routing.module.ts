import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChequesPaymentComponent } from './cheques-payment/cheques-payment.component';
import { CommercialChequesComponent } from './commercial-cheques/commercial-cheques.component';

const routes: Routes = [
  { path: '', component: ChequesPaymentComponent },
  { path: 'commercial', component: CommercialChequesComponent },
  // { path: 'all', component: ChequesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChequesRoutingModule { }
