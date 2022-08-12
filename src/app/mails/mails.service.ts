import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http.service';
import { Mail } from './mail.interface';

@Injectable({
  providedIn: 'root'
})
export class MailsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getCount(): Observable<number> {
    return this.httpService.get('mails/count');
  }

  getManyByPage(pageIndex: number, pageSize: number): Observable<Mail[]> {
    return this.httpService.get(`mails/${pageIndex}/${pageSize}`);
  }

  getManyByKey(key: string): Observable<Mail[]> {
    return this.httpService.get(`mails/byAny/${key}`);
  }
}
