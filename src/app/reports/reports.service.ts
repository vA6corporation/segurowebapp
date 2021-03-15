import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getGuarantiesByRange(startDate: string, endDate: string): Observable<any[]> {
    return this.httpService.get(`reports/${startDate}/${endDate}`);
  }

}
