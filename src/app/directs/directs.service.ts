import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http.service';
import { Direct } from './direct.model';

@Injectable({
  providedIn: 'root'
})
export class DirectsService {

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
  ) { }

  getDirectsByAny(key: string): Observable<Direct[]> {
    return this.httpService.get(`directs/byAny/${key}`);
  }

  sendMail(directId: string): Observable<Direct> {
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

  create(direct: Direct): Observable<Direct> {
    direct.businessId = this.authService.businessId;
    direct.userId = this.authService.userId;
    return this.httpService.post('directs', { direct });
  }

  update(direct: Direct, directId: string): Observable<Direct> {
    return this.httpService.put(`directs/${directId}`, { direct });
  }


}
