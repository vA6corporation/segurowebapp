import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompliancesRoutingModule } from './compliances-routing.module';
import { CompliancesComponent } from './compliances/compliances.component';
import { CreateCompliancesComponent } from './create-compliances/create-compliances.component';
import { EditCompliancesComponent } from './edit-compliances/edit-compliances.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PartnershipsModule } from '../partnerships/partnerships.module';
import { DialogComplianceComponent } from './dialog-compliance/dialog-compliance.component';
import { DialogPdfCompliancesComponent } from './dialog-pdf-compliances/dialog-pdf-compliances.component';
import { EditCommercialsComponent } from './edit-commercials/edit-commercials.component';
import { BusinessesModule } from '../businesses/businesses.module';

@NgModule({
  declarations: [
    CompliancesComponent, 
    CreateCompliancesComponent, 
    EditCompliancesComponent, DialogComplianceComponent, DialogPdfCompliancesComponent, EditCommercialsComponent, 
  ],
  imports: [
    CommonModule,
    CompliancesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BusinessesModule,
    PartnershipsModule,
  ]
})
export class CompliancesModule { }
