import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { NotificationModel } from '../notification.model';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass']
})
export class NotificationsComponent implements OnInit {

  constructor( 
    private readonly notificationsService: NotificationsService,
    private readonly navigationService: NavigationService,
  ) { }

  public displayedColumns: string[] = [ 'createdAt', 'title', 'actions' ];
  public dataSource: NotificationModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  ngOnInit(): void {
    this.navigationService.setTitle('Notifications');
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);

    this.notificationsService.getCountNotifications().subscribe(count => {
      this.length = count;
    });

    this.notificationsService.getNotificationsByPage(this.pageIndex + 1, this.pageSize).subscribe(notifications => {
      this.dataSource = notifications;
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.notificationsService.getNotificationsByPage(event.pageIndex + 1, event.pageSize).subscribe(notifications => {
      this.dataSource = notifications;
    });
  }
  
}
