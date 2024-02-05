import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesSoatRoutingModule } from './insurances-soat-routing.module';
import { CreateInsurancesSoatComponent } from './create-insurances-soat/create-insurances-soat.component';
import { CreateInsurancesSoatWithInsuranceGroupComponent } from './create-insurances-soat-with-insurance-group/create-insurances-soat-with-insurance-group.component';
import { EditInsurancesSoatComponent } from './edit-insurances-soat/edit-insurances-soat.component';
import { InsurancesSoatComponent } from './insurances-soat/insurances-soat.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateInsurancesSoatComponent,
    CreateInsurancesSoatWithInsuranceGroupComponent,
    EditInsurancesSoatComponent,
    InsurancesSoatComponent
  ],
  imports: [
    CommonModule,
    InsurancesSoatRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsurancesSoatModule { }
