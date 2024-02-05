import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesVidaRoutingModule } from './insurances-vida-routing.module';
import { InsurancesVidaComponent } from './insurances-vida/insurances-vida.component';
import { CreateInsurancesVidaComponent } from './create-insurances-vida/create-insurances-vida.component';
import { CreateInsurancesVidaWithInsuranceGroupComponent } from './create-insurances-vida-with-insurance-group/create-insurances-vida-with-insurance-group.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditInsurancesVidaComponent } from './edit-insurances-vida/edit-insurances-vida.component';


@NgModule({
  declarations: [
    InsurancesVidaComponent,
    CreateInsurancesVidaComponent,
    CreateInsurancesVidaWithInsuranceGroupComponent,
    EditInsurancesVidaComponent
  ],
  imports: [
    CommonModule,
    InsurancesVidaRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsurancesVidaModule { }
