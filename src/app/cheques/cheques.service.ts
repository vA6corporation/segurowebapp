import { Injectable } from '@angular/core';
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

  getByPage(pageIndex: number, pageSize: number): Observable<{ cheques: Cheque[], count: number }> {
    return this.httpService.get(`cheques/byPage/${pageIndex}/${pageSize}`);
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
