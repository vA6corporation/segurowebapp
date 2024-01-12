import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesRcivilRoutingModule } from './insurances-rcivil-routing.module';
import { InsurancesRcivilComponent } from './insurances-rcivil/insurances-rcivil.component';
import { CreateInsurancesRcivilComponent } from './create-insurances-rcivil/create-insurances-rcivil.component';
import { CreateInsurancesRcivilWithInsuranceGroupComponent } from './create-insurances-rcivil-with-insurance-group/create-insurances-rcivil-with-insurance-group.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditInsurancesRcivilComponent } from './edit-insurances-rcivil/edit-insurances-rcivil.component';


@NgModule({
  declarations: [
    InsurancesRcivilComponent,
    CreateInsurancesRcivilComponent,
    CreateInsurancesRcivilWithInsuranceGroupComponent,
    EditInsurancesRcivilComponent
  ],
  imports: [
    CommonModule,
    InsurancesRcivilRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsurancesRcivilModule { }
