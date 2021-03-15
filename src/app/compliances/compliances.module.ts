import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompliancesRoutingModule } from './compliances-routing.module';
import { CompliancesComponent } from './compliances/compliances.component';
import { CreateCompliancesComponent } from './create-compliances/create-compliances.component';
import { EditCompliancesComponent } from './edit-compliances/edit-compliances.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogBeneficiariesComponent } from '../dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogPartnershipsComponent } from '../dialog-partnerships/dialog-partnerships.component';

@NgModule({
  declarations: [
    CompliancesComponent, 
    CreateCompliancesComponent, 
    EditCompliancesComponent, 
    DialogBeneficiariesComponent,
    DialogPartnershipsComponent,
  ],
  imports: [
    CommonModule,
    CompliancesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class CompliancesModule { }
