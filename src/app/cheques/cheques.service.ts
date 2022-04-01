import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { Cheque } from './cheque.model';

@Injectable({
  providedIn: 'root'
})
export class ChequesService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  forPaid(): Observable<Cheque[]> {
    return this.httpService.get('cheques/forPaid');
  }

  getCountChequesByRangeDate(startDate: Date, endDate: Date): Observable<number> {
    return this.httpService.get(`cheques/countChequesByRangeDate/${startDate}/${endDate}`);
  }

  getCountCheques(): Observable<number> {
    return this.httpService.get(`cheques/countCheques`);
  }

  getChequesByPage(pageIndex: number, pageSize: number, params: Params): Observable<Cheque[]> {
    return this.httpService.get(`cheques/byPage/${pageIndex}/${pageSize}`, { params });
  }

  getByRangeDatePage(startDate: Date, endDate: Date, pageIndex: number, pageSize: number): Observable<Cheque[]> {
    return this.httpService.get(`cheques/byRangeDatePage/${startDate}/${endDate}/${pageIndex}/${pageSize}`);
  }

  getCountByRangeDate(startDate: Date, endDate: Date): Observable<Cheque[]> {
    return this.httpService.get(`cheques/countByRangeDate/${startDate}/${endDate}`);
  }

  getChequeById(chequeId: string): Observable<Cheque> {
    return this.httpService.get(`cheques/byId/${chequeId}`);
  }

  getByKey(key: string): Observable<Cheque[]> {
    return this.httpService.get(`cheques/byKey/${key}`);
  }

  update(cheque: Cheque, chequeId: string) {
    return this.httpService.put(`cheques/${chequeId}`, { cheque });
  }

  create(cheque: Cheque): Observable<Cheque> {
    return this.httpService.post('cheques', { cheque });
  }

  deleteOne(chequeId: string): Observable<any> {
    console.log(chequeId);
    return this.httpService.delete(`cheques/${chequeId}`);
  }
}
