import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanciersRoutingModule } from './financiers-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FinanciersComponent } from './financiers/financiers.component';
import { CreateFinanciersComponent } from './create-financiers/create-financiers.component';
import { EditFinanciersComponent } from './edit-financiers/edit-financiers.component';

@NgModule({
  declarations: [
    FinanciersComponent,
    CreateFinanciersComponent,
    EditFinanciersComponent,
  ],
  imports: [
    CommonModule,
    FinanciersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class FinanciersModule { }
