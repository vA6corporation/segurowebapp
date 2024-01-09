import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { ChequeModel } from './cheque.model';

@Injectable({
  providedIn: 'root'
})
export class ChequesService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  forPaid(): Observable<ChequeModel[]> {
    return this.httpService.get('cheques/forPaid');
  }

  getCountChequesByRangeDate(startDate: Date, endDate: Date): Observable<number> {
    return this.httpService.get(`cheques/countChequesByRangeDate/${startDate}/${endDate}`);
  }

  getCountCheques(): Observable<number> {
    return this.httpService.get(`cheques/countCheques`);
  }

  getChequesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<ChequeModel[]> {
    return this.httpService.get(`cheques/byRangeDate/${startDate}/${endDate}`, params);
  }

  getChequesByCommercialPage(startDate: Date, endDate: Date, workerId: string, pageIndex: number, pageSize: number, params: Params): Observable<ChequeModel[]> {
    return this.httpService.get(`cheques/byCommercialPageRangeDate/${startDate}/${endDate}/${workerId}/${pageIndex}/${pageSize}`, params);
  }

  getByRangeDatePage(startDate: Date, endDate: Date, pageIndex: number, pageSize: number): Observable<ChequeModel[]> {
    return this.httpService.get(`cheques/byRangeDatePage/${startDate}/${endDate}/${pageIndex}/${pageSize}`);
  }

  getCountByRangeDate(startDate: Date, endDate: Date): Observable<ChequeModel[]> {
    return this.httpService.get(`cheques/countByRangeDate/${startDate}/${endDate}`);
  }

  getChequeById(chequeId: string): Observable<ChequeModel> {
    return this.httpService.get(`cheques/byId/${chequeId}`);
  }

  getByKey(key: string): Observable<ChequeModel[]> {
    return this.httpService.get(`cheques/byKey/${key}`);
  }

  update(cheque: ChequeModel, chequeId: string) {
    return this.httpService.put(`cheques/${chequeId}`, { cheque });
  }

  create(cheque: ChequeModel): Observable<ChequeModel> {
    return this.httpService.post('cheques', { cheque });
  }

  deleteOne(chequeId: string): Observable<any> {
    console.log(chequeId);
    return this.httpService.delete(`cheques/${chequeId}`);
  }
}
