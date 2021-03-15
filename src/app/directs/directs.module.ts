import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectsRoutingModule } from './directs-routing.module';
import { DirectsComponent } from './directs/directs.component';
import { CreateDirectsComponent } from './create-directs/create-directs.component';
import { EditDirectsComponent } from './edit-directs/edit-directs.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DirectsComponent, 
    CreateDirectsComponent, 
    EditDirectsComponent
  ],
  imports: [
    CommonModule,
    DirectsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class DirectsModule { }
