import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimasRoutingModule } from './primas-routing.module';
import { PrimasComponent } from './primas/primas.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PrimasComponent],
  imports: [
    CommonModule,
    PrimasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class PrimasModule { }
