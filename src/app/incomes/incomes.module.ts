import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomesRoutingModule } from './incomes-routing.module';
import { IncomesComponent } from './incomes/incomes.component';


@NgModule({
  declarations: [IncomesComponent],
  imports: [
    CommonModule,
    IncomesRoutingModule
  ]
})
export class IncomesModule { }
