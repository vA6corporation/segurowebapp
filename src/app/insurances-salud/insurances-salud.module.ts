import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesSaludRoutingModule } from './insurances-salud-routing.module';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditInsurancesSaludComponent } from './edit-insurances-salud/edit-insurances-salud.component';
import { InsurancesSaludComponent } from './insurances-salud/insurances-salud.component';
import { CreateInsurancesSaludComponent } from './create-insurances-salud/create-insurances-salud.component';
import { CreateInsurancesSaludWithInsuranceGroupComponent } from './create-insurances-salud-with-insurance-group/create-insurances-salud-with-insurance-group.component';


@NgModule({
  declarations: [
    InsurancesSaludComponent,
    CreateInsurancesSaludComponent,
    CreateInsurancesSaludWithInsuranceGroupComponent,
    EditInsurancesSaludComponent
  ],
  imports: [
    CommonModule,
    InsurancesSaludRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsurancesSaludModule { }
