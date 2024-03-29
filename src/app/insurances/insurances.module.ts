import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsurancesRoutingModule } from './insurances-routing.module';
import { InsurancesComponent } from './insurances/insurances.component';
import { CreateInsurancesComponent } from './create-insurances/create-insurances.component';
import { EditInsurancesComponent } from './edit-insurances/edit-insurances.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogAttachPdfComponent } from './dialog-attach-pdf/dialog-attach-pdf.component';
import { ReportComponent } from './report/report.component';
import { ReportPieComponent } from './report-pie/report-pie.component';
import { RenewComponent } from './renew/renew.component';
import { DialogSelectPdfComponent } from './dialog-select-pdf/dialog-select-pdf.component';
import { CreateInsurancesWithInsuranceGroupComponent } from './create-insurances-with-insurance-group/create-insurances-with-insurance-group.component';
import { SheetConstructionsComponent } from './sheet-constructions/sheet-constructions.component';


@NgModule({
  declarations: [InsurancesComponent, CreateInsurancesComponent, EditInsurancesComponent, DialogAttachPdfComponent, ReportComponent, ReportPieComponent, RenewComponent, DialogSelectPdfComponent, CreateInsurancesWithInsuranceGroupComponent, SheetConstructionsComponent],
  imports: [
    CommonModule,
    InsurancesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InsurancesModule { }
