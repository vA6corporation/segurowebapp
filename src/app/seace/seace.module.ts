import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeaceRoutingModule } from './seace-routing.module';
import { SeaceComponent } from './seace/seace.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogSeaceDetailsComponent } from './dialog-seace-details/dialog-seace-details.component';


@NgModule({
  declarations: [SeaceComponent, DialogSeaceDetailsComponent],
  imports: [
    CommonModule,
    SeaceRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SeaceModule { }
