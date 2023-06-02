import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolsRoutingModule } from './tools-routing.module';
import { PaymentOrdersComponent } from './payment-orders/payment-orders.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ 
    PaymentOrdersComponent
  ],
  imports: [
    CommonModule,
    ToolsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ToolsModule { }
