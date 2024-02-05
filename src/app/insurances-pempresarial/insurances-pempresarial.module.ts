import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CreateInsurancesPempresarialWithInsuranceGroupComponent } from './create-insurances-pempresarial-with-insurance-group/create-insurances-pempresarial-with-insurance-group.component';
import { CreateInsurancesPempresarialComponent } from './create-insurances-pempresarial/create-insurances-pempresarial.component';
import { EditInsurancesPempresarialComponent } from './edit-insurances-pempresarial/edit-insurances-pempresarial.component';
import { InsurancesPempresarialRoutingModule } from './insurances-pempresarial-routing.module';
import { InsurancesPempresarialComponent } from './insurances-pempresarial/insurances-pempresarial.component';


@NgModule({
  declarations: [
    InsurancesPempresarialComponent,
    CreateInsurancesPempresarialComponent,
    CreateInsurancesPempresarialWithInsuranceGroupComponent,
    EditInsurancesPempresarialComponent
  ],
  imports: [
    CommonModule,
    InsurancesPempresarialRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsurancesPempresarialModule { }
