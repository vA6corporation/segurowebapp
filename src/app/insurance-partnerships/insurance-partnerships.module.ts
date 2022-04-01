import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancePartnershipsRoutingModule } from './insurance-partnerships-routing.module';
import { CreateInsurancePartnershipsComponent } from './create-insurance-partnerships/create-insurance-partnerships.component';
import { EditInsurancePartnershipsComponent } from './edit-insurance-partnerships/edit-insurance-partnerships.component';
import { InsurancePartnershipsComponent } from './insurance-partnerships/insurance-partnerships.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogInsurancePartnershipsComponent } from './dialog-insurance-partnerships/dialog-insurance-partnerships.component';


@NgModule({
  declarations: [CreateInsurancePartnershipsComponent, EditInsurancePartnershipsComponent, InsurancePartnershipsComponent, DialogInsurancePartnershipsComponent],
  imports: [
    CommonModule,
    InsurancePartnershipsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsurancePartnershipsModule { }
