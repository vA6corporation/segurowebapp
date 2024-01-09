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

  getGuarantiesByKey(params: Params): Observable<any[]> {
    return this.httpService.get(`reports/byKey`, params);
  }

  getGuarantiesByCommercialKey(workerId: string, key: string): Observable<any[]> {
    return this.httpService.get(`reports/byCommercialKey/${workerId}/${key}`);
  }

  getGuarantiesWithoutConstructions(): Observable<any[]> {
    return this.httpService.get(`reports/withoutConstructions`);
  }

  getGuarantiesByFinancierWorkerStatus(params: Params): Observable<any[]> {
    return this.httpService.get(`reports/byFinancierWorkerStatus`, params);
  }

  getGuarantiesByStatus(processStatusCode: string, status: string): Observable<any[]> {
    const params: Params = {
      processStatusCode,
      status,
    };
    return this.httpService.get(`reports/byStatus`, params);
  }

  getCollectionGuarantiesByRangeDateWorker(params: Params): Observable<any> {
    return this.httpService.get('reports/collectionGuarantiesByRangeDateWorker', params);
  }

  getSummaryPrimasByRangeDateWorker(params: Params): Observable<any> {
    return this.httpService.get('reports/summaryPrimasByRangeDateWorker', params);
  }

  getPrimasByRangeDateWorker(params: Params): Observable<any> {
    return this.httpService.get('reports/primasByRangeDateWorker', params);
  }

  getCommissionsByYear(year: number, params: Params): Observable<any[]> {
    return this.httpService.get(`reports/commissionsByYear/${year}`, params);
  }

}
