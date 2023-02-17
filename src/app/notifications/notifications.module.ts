import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { DialogNotificationsComponent } from './dialog-notifications/dialog-notifications.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [NotificationsComponent, DialogNotificationsComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    MaterialModule
  ]
})
export class NotificationsModule { }
