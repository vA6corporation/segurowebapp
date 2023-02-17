import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OfficeModel } from '../auth/office.model';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class OfficesService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  private offices: OfficeModel[] = [];
  private offices$: Subject<OfficeModel[]> = new Subject();

  getOffices(): Observable<OfficeModel[]> {
    return this.httpService.get('offices');
  }

  handleOffices(): Observable<OfficeModel[]> {
    if (this.offices.length === 0) {
      this.getOffices().subscribe(offices => {
        this.offices = offices;
        this.offices$.next(offices);
      }, (error: HttpErrorResponse) => {
        console.log(error.message);
      });
    } else {
      setTimeout(() => {
        this.offices$.next(this.offices);
      });
    }
    return this.offices$.asObservable();
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
