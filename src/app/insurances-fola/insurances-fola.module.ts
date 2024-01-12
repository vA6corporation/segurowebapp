import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesFolaRoutingModule } from './insurances-fola-routing.module';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditInsurancesFolaComponent } from './edit-insurances-fola/edit-insurances-fola.component';
import { CreateInsurancesFolaComponent } from './create-insurances-fola/create-insurances-fola.component';
import { InsurancesFolaComponent } from './insurances-fola/insurances-fola.component';
import { CreateInsurancesFolaWithInsuranceGroupComponent } from './create-insurances-fola-with-insurance-group/create-insurances-fola-with-insurance-group.component';


@NgModule({
  declarations: [
    InsurancesFolaComponent,
    CreateInsurancesFolaComponent,
    CreateInsurancesFolaWithInsuranceGroupComponent,
    EditInsurancesFolaComponent
  ],
  imports: [
    CommonModule,
    InsurancesFolaRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsurancesFolaModule { }
