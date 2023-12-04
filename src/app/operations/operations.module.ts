import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationsRoutingModule } from './operations-routing.module';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateOperationsComponent } from './create-operations/create-operations.component';
import { EditOperationsComponent } from './edit-operations/edit-operations.component';
import { OperationsComponent } from './operations/operations.component';
import { DialogNodeOperationsComponent } from './dialog-node-operations/dialog-node-operations.component';


@NgModule({
  declarations: [
    OperationsComponent,
    CreateOperationsComponent,
    EditOperationsComponent,
    DialogNodeOperationsComponent
  ],
  imports: [
    CommonModule,
    OperationsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class OperationsModule { }
