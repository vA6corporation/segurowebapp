import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectsRoutingModule } from './directs-routing.module';
import { DirectsComponent } from './directs/directs.component';
import { CreateDirectsComponent } from './create-directs/create-directs.component';
import { EditDirectsComponent } from './edit-directs/edit-directs.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PartnershipsModule } from '../partnerships/partnerships.module';
import { DialogDirectComponent } from './dialog-direct/dialog-direct.component';
import { DialogPdfDirectsComponent } from './dialog-pdf-directs/dialog-pdf-directs.component';
import { EditCommercialsComponent } from './edit-commercials/edit-commercials.component';


@NgModule({
  declarations: [
    DirectsComponent, 
    CreateDirectsComponent, 
    EditDirectsComponent, DialogDirectComponent, DialogPdfDirectsComponent, EditCommercialsComponent,
  ],
  imports: [
    CommonModule,
    DirectsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    PartnershipsModule,
  ]
})
export class DirectsModule { }
