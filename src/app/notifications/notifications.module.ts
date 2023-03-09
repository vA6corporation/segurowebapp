import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { DialogNotificationsComponent } from './dialog-notifications/dialog-notifications.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NotificationsComponent, DialogNotificationsComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class NotificationsModule { }
