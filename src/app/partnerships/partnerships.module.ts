import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnershipsRoutingModule } from './partnerships-routing.module';
import { PartnershipsComponent } from './partnerships/partnerships.component';
import { CreatePartnershipsComponent } from './create-partnerships/create-partnerships.component';
import { EditPartnershipsComponent } from './edit-partnerships/edit-partnerships.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogPartnershipsComponent } from './dialog-partnerships/dialog-partnerships.component';
import { DialogPartnershipItemsComponent } from './dialog-partnership-items/dialog-partnership-items.component';


@NgModule({
  declarations: [
    PartnershipsComponent, 
    CreatePartnershipsComponent, 
    EditPartnershipsComponent,
    PartnershipsComponent,
    DialogPartnershipsComponent,
    DialogPartnershipItemsComponent
  ],
  imports: [
    CommonModule,
    PartnershipsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    DialogPartnershipsComponent,
  ]
})
export class PartnershipsModule { }
