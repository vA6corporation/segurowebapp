import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiariesRoutingModule } from './beneficiaries-routing.module';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { CreateBeneficiariesComponent } from './create-beneficiaries/create-beneficiaries.component';
import { EditBeneficiariesComponent } from './edit-beneficiaries/edit-beneficiaries.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogBeneficiariesComponent } from './dialog-beneficiaries/dialog-beneficiaries.component';


@NgModule({
  declarations: [
    BeneficiariesComponent, 
    CreateBeneficiariesComponent, 
    EditBeneficiariesComponent,
    DialogBeneficiariesComponent,
  ],
  imports: [
    CommonModule,
    BeneficiariesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    DialogBeneficiariesComponent,
  ]
})
export class BeneficiariesModule { }
