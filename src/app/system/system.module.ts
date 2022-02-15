import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogAttachFileComponent } from './dialog-attach-file/dialog-attach-file.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogPdfComponent } from './dialog-pdf/dialog-pdf.component';



@NgModule({
  declarations: [
    DialogAttachFileComponent,
    DialogPdfComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    DialogAttachFileComponent,
  ]
})
export class SystemModule { }
