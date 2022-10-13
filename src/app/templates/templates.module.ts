import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesComponent } from './templates/templates.component';
import { MaterialModule } from '../material.module';
import { CreateTemplatesComponent } from './create-templates/create-templates.component';
import { EditTemplatesComponent } from './edit-templates/edit-templates.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogTemplatesComponent } from './dialog-templates/dialog-templates.component';
import { DialogAddGuarantiesComponent } from './dialog-add-guaranties/dialog-add-guaranties.component';


@NgModule({
  declarations: [
    TemplatesComponent, 
    CreateTemplatesComponent, 
    EditTemplatesComponent,
    DialogTemplatesComponent,
    DialogAddGuarantiesComponent,
  ],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class TemplatesModule { }
