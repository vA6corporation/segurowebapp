import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfficeModel } from '../auth/office.model';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class OfficesService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getOffices(): Observable<OfficeModel[]> {
    return this.httpService.get('offices');
  }

  getActiveOffices(): Observable<OfficeModel[]> {
    return this.httpService.get('offices/active');
  }

  getActivities(): Observable<any[]> {
    return this.httpService.get('activities');
  }

  getOfficeById(officeId: string) {
    return this.httpService.get(`offices/byId/${officeId}`);
  }
  
  getOfficesByGroup(groupId: string) {
    return this.httpService.get(`offices/byGroup/${groupId}`);
  }

  create(office: OfficeModel): Observable<OfficeModel> {
    return this.httpService.post('offices', { office });
  }

  update(office: OfficeModel, officeId: string) {
    return this.httpService.put(`offices/${officeId}`, { office });
  }
}
