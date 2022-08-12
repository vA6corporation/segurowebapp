import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceConstructionsRoutingModule } from './insurance-constructions-routing.module';
import { InsuranceConstructionsComponent } from './insurance-constructions/insurance-constructions.component';
import { CreateInsuranceConstructionsComponent } from './create-insurance-constructions/create-insurance-constructions.component';
import { EditInsuranceConstructionsComponent } from './edit-insurance-constructions/edit-insurance-constructions.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogInsuranceConstructionsComponent } from './dialog-insurance-constructions/dialog-insurance-constructions.component';


@NgModule({
  declarations: [InsuranceConstructionsComponent, CreateInsuranceConstructionsComponent, EditInsuranceConstructionsComponent, DialogInsuranceConstructionsComponent],
  imports: [
    CommonModule,
    InsuranceConstructionsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsuranceConstructionsModule { }
