import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesPolizaearRoutingModule } from './insurances-polizaear-routing.module';
import { CreateInsurancesPolizaearWithInsuranceGroupComponent } from './create-insurances-polizaear-with-insurance-group/create-insurances-polizaear-with-insurance-group.component';
import { CreateInsurancesPolizaearComponent } from './create-insurances-polizaear/create-insurances-polizaear.component';
import { InsurancesPolizaearComponent } from './insurances-polizaear/insurances-polizaear.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditInsurancesPolizaearComponent } from './edit-insurances-polizaear/edit-insurances-polizaear.component';


@NgModule({
  declarations: [
    CreateInsurancesPolizaearWithInsuranceGroupComponent,
    CreateInsurancesPolizaearComponent,
    InsurancesPolizaearComponent,
    EditInsurancesPolizaearComponent
  ],
  imports: [
    CommonModule,
    InsurancesPolizaearRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsurancesPolizaearModule { }
