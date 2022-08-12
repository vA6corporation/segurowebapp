import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { ShareholderModel } from './shareholder.model';

@Injectable({
  providedIn: 'root'
})
export class ShareholdersService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getShareholdersCount(): Observable<number> {
    return this.httpService.get('shareholders/countShareholders');
  }

  getShareholdersByPage(pageIndex: number, pageSize: number): Observable<ShareholderModel[]> {
    return this.httpService.get(`shareholders/byPage/${pageIndex}/${pageSize}`);
  }

  create(shareholder: any): Observable<ShareholderModel> {
    return this.httpService.post('shareholders', { shareholder });
  }

  update(shareholder: any, shareholderId: string) {
    return this.httpService.put(`shareholder/${shareholderId}`, { shareholder });
  }

}
