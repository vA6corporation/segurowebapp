import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { NotificationModel } from './notification.model';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getCountNotificationsByRangeDate(
    startDate: string,
    endDate: string,
    params: Params
  ): Observable<number> {
    return this.httpService.get(`notifications/countNotificationsByRangeDate/${startDate}/${endDate}`, { params });
  }

  getNotificationsByKey(key: string): Observable<NotificationModel[]> {
    const params = { key };
    return this.httpService.get(`notifications/byKey`, { params });
  }

  getNotificationsByPage(
    startDate: string,
    endDate: string,
    pageIndex: number, 
    pageSize: number,
    params: Params
  ): Observable<NotificationModel[]> {
    return this.httpService.get(`notifications/byRangeDatePage/${startDate}/${endDate}/${pageIndex}/${pageSize}`, { params });
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
