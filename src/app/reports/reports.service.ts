import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getGuarantiesByRangeDate(startDate: string, endDate: string): Observable<any[]> {
    return this.httpService.get(`reports/byRangeDate/${startDate}/${endDate}`);
  }

  getGuarantiesByAny(key: string): Observable<any[]> {
    return this.httpService.get(`reports/byKey/${key}`);
  }

  getGuarantiesWithoutConstructions(): Observable<any[]> {
    return this.httpService.get(`reports/withoutConstructions`);
  }

  getGuarantiesByFinancierModelCustomerModelStatus(params: Params): Observable<any[]> {
    return this.httpService.get(`reports/byFinancierModelCustomerModelStatus`, { params });
  }

  getGuarantiesByStatus(processStatusCode: string, status: string): Observable<any[]> {
    const params: Params = {
      processStatusCode,
      status,
    };
    return this.httpService.get(`reports/byStatus`, { params });
  }

  getCollectionGuarantiesByRangeDateUser(params: Params): Observable<any> {
    return this.httpService.get('reports/collectionGuarantiesByRangeDateUser', { params });
  }

  getSummaryPrimasByRangeDateUser(params: Params): Observable<any> {
    return this.httpService.get('reports/summaryPrimasByRangeDateUser', { params });
  }

  getPrimasByRangeDateUser(params: Params): Observable<any> {
    return this.httpService.get('reports/primasByRangeDateUser', { params });
  }

}
