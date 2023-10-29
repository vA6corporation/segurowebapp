import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesComponent } from './templates/templates.component';
import { MaterialModule } from '../material.module';
import { CreateTemplatesComponent } from './create-templates/create-templates.component';
import { EditTemplatesComponent } from './edit-templates/edit-templates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogTemplatesComponent } from './dialog-templates/dialog-templates.component';
import { DialogAddGuarantiesComponent } from './dialog-add-guaranties/dialog-add-guaranties.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DialogEditGuarantiesComponent } from './dialog-edit-guaranties/dialog-edit-guaranties.component';


@NgModule({
  declarations: [
    TemplatesComponent, 
    CreateTemplatesComponent, 
    EditTemplatesComponent,
    DialogTemplatesComponent,
    DialogAddGuarantiesComponent,
    DialogEditGuarantiesComponent,
  ],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class TemplatesModule { }
