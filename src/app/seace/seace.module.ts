import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeaceRoutingModule } from './seace-routing.module';
import { SeaceComponent } from './seace/seace.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogSeaceDetailsComponent } from './dialog-seace-details/dialog-seace-details.component';
import { DialogEditSeaceComponent } from './dialog-edit-seace/dialog-edit-seace.component';
import { SeaceInboxComponent } from './seace-inbox/seace-inbox.component';
import { SeaceErrosComponent } from './seace-erros/seace-erros.component';
import { DialogOffersComponent } from './dialog-offers/dialog-offers.component';
import { DialogEditSeaceInboxComponent } from './dialog-edit-seace-inbox/dialog-edit-seace-inbox.component';
import { DialogBaseComponent } from './dialog-base/dialog-base.component';


@NgModule({
  declarations: [SeaceComponent, DialogSeaceDetailsComponent, DialogEditSeaceComponent, SeaceInboxComponent, SeaceErrosComponent, DialogOffersComponent, DialogEditSeaceInboxComponent, DialogBaseComponent],
  imports: [
    CommonModule,
    SeaceRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SeaceModule { }
