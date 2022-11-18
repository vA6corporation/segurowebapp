import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChequesRoutingModule } from './cheques-routing.module';
import { DialogChequesComponent } from './dialog-cheques/dialog-cheques.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ChequesPaymentComponent } from './cheques-payment/cheques-payment.component';
import { DialogDetailChequesComponent } from './dialog-detail-cheques/dialog-detail-cheques.component';
import { CommercialChequesComponent } from './commercial-cheques/commercial-cheques.component';

@NgModule({
  declarations: [
    DialogChequesComponent,
    ChequesPaymentComponent,
    DialogDetailChequesComponent,
    CommercialChequesComponent
  ],
  imports: [
    CommonModule,
    ChequesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class ChequesModule { }
