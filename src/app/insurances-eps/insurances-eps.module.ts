import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesEpsRoutingModule } from './insurances-eps-routing.module';
import { CreateInsurancesEpsComponent } from './create-insurances-eps/create-insurances-eps.component';
import { CreateInsurancesEpsWithInsuranceGroupComponent } from './create-insurances-eps-with-insurance-group/create-insurances-eps-with-insurance-group.component';
import { InsurancesEpsComponent } from './insurances-eps/insurances-eps.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditInsurancesEpsComponent } from './edit-insurances-eps/edit-insurances-eps.component';


@NgModule({
  declarations: [
    CreateInsurancesEpsComponent,
    CreateInsurancesEpsWithInsuranceGroupComponent,
    InsurancesEpsComponent,
    EditInsurancesEpsComponent
  ],
  imports: [
    CommonModule,
    InsurancesEpsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsurancesEpsModule { }
