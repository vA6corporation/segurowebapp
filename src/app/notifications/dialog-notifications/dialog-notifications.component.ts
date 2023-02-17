import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationModel } from '../notification.model';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-dialog-notifications',
  templateUrl: './dialog-notifications.component.html',
  styleUrls: ['./dialog-notifications.component.sass']
})
export class DialogNotificationsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly notifications: NotificationModel[],
    private readonly notificationsService: NotificationsService,
  ) { }

  ngOnInit(): void {
  }

  onDisableNotification(notificationId: string, index: number) {
    this.notifications.splice(index, 1);
    this.notificationsService.getDisableNotification(notificationId).subscribe(() => {
    });
  }

}
