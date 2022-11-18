import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatePartnershipsRoutingModule } from './template-partnerships-routing.module';
import { TemplatePartnershipsComponent } from './template-partnerships/template-partnerships.component';
import { CreateTemplatePartnershipsComponent } from './create-template-partnerships/create-template-partnerships.component';
import { EditTemplatePartnershipsComponent } from './edit-template-partnerships/edit-template-partnerships.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogTemplatePartnershipsComponent } from './dialog-template-partnerships/dialog-template-partnerships.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [TemplatePartnershipsComponent, CreateTemplatePartnershipsComponent, EditTemplatePartnershipsComponent, DialogTemplatePartnershipsComponent],
  imports: [
    CommonModule,
    TemplatePartnershipsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class TemplatePartnershipsModule { }
