import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesVidaleyRoutingModule } from './insurances-vidaley-routing.module';
import { InsurancesVidaleyComponent } from './insurances-vidaley/insurances-vidaley.component';
import { CreateInsurancesVidaleyComponent } from './create-insurances-vidaley/create-insurances-vidaley.component';
import { CreateInsurancesVidaleyWithInsuranceGroupComponent } from './create-insurances-vidaley-with-insurance-group/create-insurances-vidaley-with-insurance-group.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditInsurancesVidaleyComponent } from './edit-insurances-vidaley/edit-insurances-vidaley.component';


@NgModule({
  declarations: [
    InsurancesVidaleyComponent,
    CreateInsurancesVidaleyComponent,
    CreateInsurancesVidaleyWithInsuranceGroupComponent,
    EditInsurancesVidaleyComponent
  ],
  imports: [
    CommonModule,
    InsurancesVidaleyRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsurancesVidaleyModule { }
