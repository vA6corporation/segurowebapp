import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { DialogInvestmentsComponent } from './dialog-investments/dialog-investments.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DialogInvestmentsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class InvestmentsModule { }
