import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { NotificationModel } from './notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getCountNotifications(): Observable<number> {
    return this.httpService.get('notifications/countNotifications');
  }

  getNotificationsByPage(
    pageIndex: number, 
    pageSize: number
  ): Observable<NotificationModel[]> {
    return this.httpService.get(`notifications/byPage/${pageIndex}/${pageSize}`);
  }

  getActiveNotifications(): Observable<NotificationModel[]> {
    return this.httpService.get('notifications/activeNotifications');
  }

  getNotificationsByWorker(workerId: string): Observable<NotificationModel[]> {
    return this.httpService.get(`notifications/byWorker/${workerId}`);
  }

  getDisableNotification(notificationId: string): Observable<void> {
    return this.httpService.get(`notifications/disableNotification/${notificationId}`);
  }

}
