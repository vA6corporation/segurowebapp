import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalsComponent } from './legals/legals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { LegalsRoutingModule } from './legals-routing.module';



@NgModule({
  declarations: [LegalsComponent],
  imports: [
    CommonModule,
    LegalsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class LegalsModule { }
