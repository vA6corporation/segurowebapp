import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnershipsRoutingModule } from './partnerships-routing.module';
import { PartnershipsComponent } from './partnerships/partnerships.component';
import { CreatePartnershipsComponent } from './create-partnerships/create-partnerships.component';
import { EditPartnershipsComponent } from './edit-partnerships/edit-partnerships.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PartnershipsComponent, 
    CreatePartnershipsComponent, 
    EditPartnershipsComponent,
  ],
  imports: [
    CommonModule,
    PartnershipsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class PartnershipsModule { }
