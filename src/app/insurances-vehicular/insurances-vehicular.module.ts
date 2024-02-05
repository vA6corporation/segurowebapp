import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesVehicularRoutingModule } from './insurances-vehicular-routing.module';
import { CreateInsurancesVehicularWithInsuranceGroupComponent } from './create-insurances-vehicular-with-insurance-group/create-insurances-vehicular-with-insurance-group.component';
import { CreateInsurancesVehicularComponent } from './create-insurances-vehicular/create-insurances-vehicular.component';
import { InsurancesVehicularComponent } from './insurances-vehicular/insurances-vehicular.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditInsurancesVehicularComponent } from './edit-insurances-vehicular/edit-insurances-vehicular.component';


@NgModule({
  declarations: [
    CreateInsurancesVehicularWithInsuranceGroupComponent,
    CreateInsurancesVehicularComponent,
    InsurancesVehicularComponent,
    EditInsurancesVehicularComponent
  ],
  imports: [
    CommonModule,
    InsurancesVehicularRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsurancesVehicularModule { }
