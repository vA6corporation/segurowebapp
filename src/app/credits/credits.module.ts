import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditsRoutingModule } from './credits-routing.module';
import { CreditsComponent } from './credits/credits.component';
import { CreateCreditsComponent } from './create-credits/create-credits.component';
import { EditCreditsComponent } from './edit-credits/edit-credits.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { DialogAttachPdfComponent } from './dialog-attach-pdf/dialog-attach-pdf.component';
import { ReportComponent } from './report/report.component';
import { DialogDetailCreditsComponent } from './dialog-detail-credits/dialog-detail-credits.component';


@NgModule({
  declarations: [CreditsComponent, CreateCreditsComponent, EditCreditsComponent, DialogAttachPdfComponent, ReportComponent, DialogDetailCreditsComponent],
  imports: [
    CommonModule,
    CreditsRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class CreditsModule { }
