import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesAccidentesRoutingModule } from './insurances-accidentes-routing.module';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditInsurancesAccidentesComponent } from './edit-insurances-accidentes/edit-insurances-accidentes.component';
import { InsurancesAccidentesComponent } from './insurances-accidentes/insurances-accidentes.component';
import { CreateInsurancesAccidentesComponent } from './create-insurances-accidentes/create-insurances-accidentes.component';
import { CreateInsurancesAccidentesWithInsuranceGroupComponent } from './create-insurances-accidentes-with-insurance-group/create-insurances-accidentes-with-insurance-group.component';


@NgModule({
  declarations: [
    InsurancesAccidentesComponent,
    CreateInsurancesAccidentesComponent,
    CreateInsurancesAccidentesWithInsuranceGroupComponent,
    EditInsurancesAccidentesComponent
  ],
  imports: [
    CommonModule,
    InsurancesAccidentesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsurancesAccidentesModule { }
