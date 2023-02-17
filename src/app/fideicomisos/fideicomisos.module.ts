import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FideicomisosRoutingModule } from './fideicomisos-routing.module';
import { FideicomisosComponent } from './fideicomisos/fideicomisos.component';
import { CreateFideicomisosComponent } from './create-fideicomisos/create-fideicomisos.component';
import { EditFideicomisosComponent } from './edit-fideicomisos/edit-fideicomisos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [FideicomisosComponent, CreateFideicomisosComponent, EditFideicomisosComponent],
  imports: [
    CommonModule,
    FideicomisosRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class FideicomisosModule { }
