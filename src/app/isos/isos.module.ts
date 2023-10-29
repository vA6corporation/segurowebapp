import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IsosRoutingModule } from './isos-routing.module';
import { CreateIsosComponent } from './create-isos/create-isos.component';
import { EditIsosComponent } from './edit-isos/edit-isos.component';
import { IsosComponent } from './isos/isos.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogAttachPdfComponent } from './dialog-attach-pdf/dialog-attach-pdf.component';


@NgModule({
  declarations: [CreateIsosComponent, EditIsosComponent, IsosComponent, DialogAttachPdfComponent],
  imports: [
    CommonModule,
    IsosRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class IsosModule { }
