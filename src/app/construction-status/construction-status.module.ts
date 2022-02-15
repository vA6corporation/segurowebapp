import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstructionStatusRoutingModule } from './construction-status-routing.module';
import { ConstructionStatusComponent } from './construction-status/construction-status.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ConstructionStatusComponent],
  imports: [
    CommonModule,
    ConstructionStatusRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class ConstructionStatusModule { }
