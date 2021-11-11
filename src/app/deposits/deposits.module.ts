import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogDepositsComponent } from './dialog-deposits/dialog-deposits.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    DialogDepositsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  // exports: [
  //   DialogDepositsComponent,
  // ]
})
export class DepositsModule { }
