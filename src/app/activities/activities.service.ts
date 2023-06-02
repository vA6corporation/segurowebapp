import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { ActivityModel } from './activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(
    private readonly httpService: HttpService
  ) { }

  getCountActivities() {
    return this.httpService.get('activities');
  }

  getActivitiesByPage(pageIndex: number, pageSize: number): Observable<ActivityModel[]> {
    return this.httpService.get(`activities/${pageIndex}/${pageSize}`);
  }

  handleActivities() {

  }

}
