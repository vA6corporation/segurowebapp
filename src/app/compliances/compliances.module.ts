import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompliancesRoutingModule } from './compliances-routing.module';
import { CompliancesComponent } from './compliances/compliances.component';
import { CreateCompliancesComponent } from './create-compliances/create-compliances.component';
import { EditCompliancesComponent } from './edit-compliances/edit-compliances.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomersModule } from '../customers/customers.module';
import { PartnershipsModule } from '../partnerships/partnerships.module';
import { DialogComplianceComponent } from './dialog-compliance/dialog-compliance.component';
import { DialogPdfCompliancesComponent } from './dialog-pdf-compliances/dialog-pdf-compliances.component';

@NgModule({
  declarations: [
    CompliancesComponent, 
    CreateCompliancesComponent, 
    EditCompliancesComponent, DialogComplianceComponent, DialogPdfCompliancesComponent, 
  ],
  imports: [
    CommonModule,
    CompliancesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CustomersModule,
    PartnershipsModule,
  ]
})
export class CompliancesModule { }
