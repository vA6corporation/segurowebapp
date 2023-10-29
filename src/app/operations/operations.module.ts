import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateOperationsComponent } from './create-operations/create-operations.component';
import { EditOperationsComponent } from './edit-operations/edit-operations.component';
import { DialogAttachFileComponent } from './dialog-attach-file/dialog-attach-file.component';
import { OperationsComponent } from './operations/operations.component';


@NgModule({
  declarations: [
    OperationsComponent,
    CreateOperationsComponent,
    EditOperationsComponent,
    DialogAttachFileComponent
  ],
  imports: [
    CommonModule,
    OperationsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class OperationsModule { }
