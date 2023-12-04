import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapitalIncreasesRoutingModule } from './capital-increases-routing.module';
import { CapitalIncreasesComponent } from './capital-increases/capital-increases.component';
import { CreateCapitalIncreasesComponent } from './create-capital-increases/create-capital-increases.component';
import { EditCapitalIncreasesComponent } from './edit-capital-increases/edit-capital-increases.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogAttachPdfComponent } from './dialog-attach-pdf/dialog-attach-pdf.component';


@NgModule({
  declarations: [
    CapitalIncreasesComponent,
    DialogAttachPdfComponent,
    CreateCapitalIncreasesComponent,
    EditCapitalIncreasesComponent
  ],
  imports: [
    CommonModule,
    CapitalIncreasesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class CapitalIncreasesModule { }
