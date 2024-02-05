import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesPolizacarRoutingModule } from './insurances-polizacar-routing.module';
import { CreateInsurancesPolizacarComponent } from './create-insurances-polizacar/create-insurances-polizacar.component';
import { CreateInsurancesPolizacarWithInsuranceGroupComponent } from './create-insurances-polizacar-with-insurance-group/create-insurances-polizacar-with-insurance-group.component';
import { InsurancesPolizacarComponent } from './insurances-polizacar/insurances-polizacar.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditInsurancesPolizacarComponent } from './edit-insurances-polizacar/edit-insurances-polizacar.component';


@NgModule({
  declarations: [
    CreateInsurancesPolizacarComponent,
    CreateInsurancesPolizacarWithInsuranceGroupComponent,
    InsurancesPolizacarComponent,
    EditInsurancesPolizacarComponent
  ],
  imports: [
    CommonModule,
    InsurancesPolizacarRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsurancesPolizacarModule { }
