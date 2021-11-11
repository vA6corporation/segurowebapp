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


@NgModule({
  declarations: [
    DirectsComponent, 
    CreateDirectsComponent, 
    EditDirectsComponent, DialogDirectComponent,
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
