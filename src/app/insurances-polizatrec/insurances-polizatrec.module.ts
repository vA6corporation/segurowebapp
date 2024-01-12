import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesPolizatrecRoutingModule } from './insurances-polizatrec-routing.module';
import { InsurancesPolizatrecComponent } from './insurances-polizatrec/insurances-polizatrec.component';
import { CreateInsurancesPolizatrecComponent } from './create-insurances-polizatrec/create-insurances-polizatrec.component';
import { CreateInsurancesPolizatrecWithInsuranceGroupComponent } from './create-insurances-polizatrec-with-insurance-group/create-insurances-polizatrec-with-insurance-group.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditInsurancesPolizatrecComponent } from './edit-insurances-polizatrec/edit-insurances-polizatrec.component';


@NgModule({
  declarations: [
    InsurancesPolizatrecComponent,
    CreateInsurancesPolizatrecComponent,
    CreateInsurancesPolizatrecWithInsuranceGroupComponent,
    EditInsurancesPolizatrecComponent
  ],
  imports: [
    CommonModule,
    InsurancesPolizatrecRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsurancesPolizatrecModule { }
