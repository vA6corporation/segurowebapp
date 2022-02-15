import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChequesRoutingModule } from './cheques-routing.module';
import { DialogChequesComponent } from './dialog-cheques/dialog-cheques.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ChequesComponent } from './cheques/cheques.component';
import { ChequesPaymentComponent } from './cheques-payment/cheques-payment.component';
import { DialogDetailChequesComponent } from './dialog-detail-cheques/dialog-detail-cheques.component';

@NgModule({
  declarations: [
    DialogChequesComponent,
    ChequesComponent,
    ChequesPaymentComponent,
    DialogDetailChequesComponent
  ],
  imports: [
    CommonModule,
    ChequesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  // exports: [
  //   DialogChequesComponent,
  // ]
})
export class ChequesModule { }
