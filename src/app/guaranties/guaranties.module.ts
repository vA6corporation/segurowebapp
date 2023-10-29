import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuarantiesRoutingModule } from './guaranties-routing.module';
import { DialogRenewObservationsComponent } from './dialog-renew-observations/dialog-renew-observations.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DialogRenewObservationsComponent
  ],
  imports: [
    CommonModule,
    GuarantiesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class GuarantiesModule { }
