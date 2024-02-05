import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesViajeRoutingModule } from './insurances-viaje-routing.module';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InsurancesViajeComponent } from './insurances-viaje/insurances-viaje.component';
import { CreateInsurancesViajeComponent } from './create-insurances-viaje/create-insurances-viaje.component';
import { EditInsurancesViajeComponent } from './edit-insurances-viaje/edit-insurances-viaje.component';
import { CreateInsurancesViajeWithInsuranceGroupComponent } from './create-insurances-viaje-with-insurance-group/create-insurances-viaje-with-insurance-group.component';


@NgModule({
  declarations: [
    InsurancesViajeComponent,
    CreateInsurancesViajeComponent,
    CreateInsurancesViajeWithInsuranceGroupComponent,
    EditInsurancesViajeComponent
  ],
  imports: [
    CommonModule,
    InsurancesViajeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsurancesViajeModule { }
