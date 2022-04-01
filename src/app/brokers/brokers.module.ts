import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrokersRoutingModule } from './brokers-routing.module';
import { BrokersComponent } from './brokers/brokers.component';
import { CreateBrokersComponent } from './create-brokers/create-brokers.component';
import { EditBrokersComponent } from './edit-brokers/edit-brokers.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogBrokersComponent } from './dialog-brokers/dialog-brokers.component';


@NgModule({
  declarations: [BrokersComponent, CreateBrokersComponent, EditBrokersComponent, DialogBrokersComponent],
  imports: [
    CommonModule,
    BrokersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class BrokersModule { }
