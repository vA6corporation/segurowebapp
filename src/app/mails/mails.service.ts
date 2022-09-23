import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { MailModel } from './mail.model';

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

  getManyByPage(pageIndex: number, pageSize: number): Observable<MailModel[]> {
    return this.httpService.get(`mails/${pageIndex}/${pageSize}`);
  }

  getManyByKey(key: string): Observable<MailModel[]> {
    return this.httpService.get(`mails/byKey/${key}`);
  }
}
