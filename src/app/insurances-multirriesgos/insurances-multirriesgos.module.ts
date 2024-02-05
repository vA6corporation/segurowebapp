import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesMultirriesgosRoutingModule } from './insurances-multirriesgos-routing.module';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditInsurancesMultirriesgosComponent } from './edit-insurances-multirriesgos/edit-insurances-multirriesgos.component';
import { InsurancesMultirriesgosComponent } from './insurances-multirriesgos/insurances-multirriesgos.component';
import { CreateInsurancesMultirriesgosComponent } from './create-insurances-multirriesgos/create-insurances-multirriesgos.component';
import { CreateInsurancesMultirriesgosWithInsuranceGroupComponent } from './create-insurances-multirriesgos-with-insurance-group/create-insurances-multirriesgos-with-insurance-group.component';


@NgModule({
  declarations: [
    InsurancesMultirriesgosComponent,
    CreateInsurancesMultirriesgosComponent,
    CreateInsurancesMultirriesgosWithInsuranceGroupComponent,
    EditInsurancesMultirriesgosComponent
  ],
  imports: [
    CommonModule,
    InsurancesMultirriesgosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsurancesMultirriesgosModule { }
