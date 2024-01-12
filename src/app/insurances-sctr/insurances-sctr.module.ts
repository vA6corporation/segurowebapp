import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CreateInsurancesSctrWithInsuranceGroupComponent } from './create-insurances-sctr-with-insurance-group/create-insurances-sctr-with-insurance-group.component';
import { CreateInsurancesSctrComponent } from './create-insurances-sctr/create-insurances-sctr.component';
import { EditInsurancesSctrComponent } from './edit-insurances-sctr/edit-insurances-sctr.component';
import { InsurancesSctrRoutingModule } from './insurances-sctr-routing.module';
import { InsurancesSctrComponent } from './insurances-sctr/insurances-sctr.component';



@NgModule({
  declarations: [
    InsurancesSctrComponent,
    CreateInsurancesSctrComponent,
    CreateInsurancesSctrWithInsuranceGroupComponent,
    EditInsurancesSctrComponent
  ],
  imports: [
    CommonModule,
    InsurancesSctrRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsurancesSctrModule { }
