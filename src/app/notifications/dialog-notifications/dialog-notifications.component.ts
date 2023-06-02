import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationModel } from '../notification.model';
import { NotificationsService } from '../notifications.service';
import { WorkerModel } from 'src/app/workers/worker.model';
import { Subscription } from 'rxjs';
import { WorkersService } from 'src/app/workers/workers.service';

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
    private readonly workersService: WorkersService,
  ) { }

  public workers: WorkerModel[] = [];
  public worker: WorkerModel|null = null;
  public tmpNotifications: NotificationModel[] = [];

  private handleWorkers$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleWorkers$.unsubscribe();
  }

  ngOnInit(): void {
    this.tmpNotifications = JSON.parse(JSON.stringify(this.notifications));
    this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
      this.workers = workers;
    });
  }

  onSelectionChange() {
    console.log(this.worker);
    if (this.worker) {
      this.tmpNotifications = JSON.parse(JSON.stringify(this.notifications.filter(e => e.workerId === this.worker?._id)));
    } else {
      this.tmpNotifications = this.notifications;
    }
  }

  onDisableNotification(notificationId: string, index: number) {
    this.notifications.splice(index, 1);
    this.notificationsService.getDisableNotification(notificationId).subscribe(() => {
    });
  }

}
