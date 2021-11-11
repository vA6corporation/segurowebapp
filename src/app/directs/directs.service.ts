import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Cheque } from '../cheques/cheque.model';
import { Deposit } from '../deposits/deposit.model';
import { HttpService } from '../http.service';
import { Mail } from '../mails/mail.interface';
import { Direct } from './direct.model';

@Injectable({
  providedIn: 'root'
})
export class DirectsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getDirectsByAny(key: string): Observable<Direct[]> {
    return this.httpService.get(`directs/byAny/${key}`);
  }

  sendMail(directId: string): Observable<Mail> {
    return this.httpService.get(`mails/${directId}/mailDirect`);
  }

  getDirectsCount(): Observable<number> {
    return this.httpService.get('directs/count');
  }

  getDirectById(directId: string): Observable<Direct> {
    return this.httpService.get(`directs/${directId}`);
  }

  getDirectsByPage(pageIndex: number, pageSize: number): Observable<Direct[]> {
    return this.httpService.get(`directs/${pageIndex}/${pageSize}`)
  }

  create(direct: Direct, cheques: Cheque[], deposits: Deposit[]): Observable<Direct> {
    return this.httpService.post('directs', { direct, cheques, deposits });
  }

  update(direct: Direct, directId: string): Observable<Direct> {
    return this.httpService.put(`directs/${directId}`, { direct });
  }

  delete(directId: string): Observable<any> {
    return this.httpService.delete(`directs/${directId}`);
  }
}
