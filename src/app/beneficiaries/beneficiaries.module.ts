import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiariesRoutingModule } from './beneficiaries-routing.module';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { CreateBeneficiariesComponent } from './create-beneficiaries/create-beneficiaries.component';
import { EditBeneficiariesComponent } from './edit-beneficiaries/edit-beneficiaries.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BeneficiariesComponent, 
    CreateBeneficiariesComponent, 
    EditBeneficiariesComponent
  ],
  imports: [
    CommonModule,
    BeneficiariesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class BeneficiariesModule { }
