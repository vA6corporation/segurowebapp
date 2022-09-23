import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConstructionsRoutingModule } from './constructions-routing.module';
import { ConstructionsComponent } from './constructions/constructions.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateConstructionsComponent } from './create-constructions/create-constructions.component';
import { EditConstructionsComponent } from './edit-constructions/edit-constructions.component';
import { DialogConstructionsComponent } from './dialog-constructions/dialog-constructions.component';
import { DialogDetailConstructionsComponent } from './dialog-detail-constructions/dialog-detail-constructions.component';
import { LessConstructionsComponent } from './less-constructions/less-constructions.component';
import { DialogAttachPdfComponent } from './dialog-attach-pdf/dialog-attach-pdf.component';
import { WithoutDocumentationComponent } from './without-documentation/without-documentation.component';
import { DialogAddBailComponent } from './dialog-add-bail/dialog-add-bail.component';


@NgModule({
  declarations: [
    ConstructionsComponent, 
    CreateConstructionsComponent, 
    EditConstructionsComponent, 
    DialogConstructionsComponent, 
    DialogDetailConstructionsComponent, 
    LessConstructionsComponent, 
    DialogAttachPdfComponent, 
    WithoutDocumentationComponent, 
    DialogAddBailComponent, 
  ],
  imports: [
    CommonModule,
    ConstructionsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ConstructionsModule { }
