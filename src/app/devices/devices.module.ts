import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices/devices.component';
import { DialogDevicesComponent } from './dialog-devices/dialog-devices.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    DevicesComponent,
    DialogDevicesComponent
  ],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    MaterialModule,
  ]
})
export class DevicesModule { }
