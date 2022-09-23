import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceBusinessesRoutingModule } from './insurance-businesses-routing.module';
import { CreateInsuranceBusinessesComponent } from './create-insurance-businesses/create-insurance-businesses.component';
import { EditInsuranceBusinessesComponent } from './edit-insurance-businesses/edit-insurance-businesses.component';
import { DialogInsuranceBusinessesComponent } from './dialog-insurance-businesses/dialog-insurance-businesses.component';
import { InsuranceBusinessesComponent } from './insurance-businesses/insurance-businesses.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateInsuranceBusinessesComponent, EditInsuranceBusinessesComponent, DialogInsuranceBusinessesComponent, InsuranceBusinessesComponent],
  imports: [
    CommonModule,
    InsuranceBusinessesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class InsuranceBusinessesModule { }
