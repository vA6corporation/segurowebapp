import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ActivitiesService } from '../activities.service';
import { ActivityModel } from '../activity.model';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.sass']
})
export class ActivitiesComponent implements OnInit {

  constructor( 
    private readonly activitiesService: ActivitiesService,
    private readonly navigationService: NavigationService,
  ) { }

  public displayedColumns: string[] = [ 'name', 'email', 'isAdmin', 'actions' ];
  public dataSource: ActivityModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;

  ngOnInit(): void {
    this.navigationService.setTitle('Actividades economicas');
    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true }
    ]);

    this.activitiesService.getCountActivities().subscribe(count => {
      this.length = count;
    });

    this.activitiesService.getActivitiesByPage(this.pageIndex + 1, this.pageSize).subscribe(activities => {
      this.dataSource = activities;
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.activitiesService.getActivitiesByPage(event.pageIndex + 1, event.pageSize).subscribe(activities => {
      this.dataSource = activities;
    });
  }

}
