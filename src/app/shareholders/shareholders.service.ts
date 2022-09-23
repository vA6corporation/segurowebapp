import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { MovablePropertyModel } from '../movable-properties/movable-property.model';
import { PropertyModel } from '../properties/property.model';
import { IncomeModel } from './income.model';
import { ShareholderModel } from './shareholder.model';

@Injectable({
  providedIn: 'root'
})
export class ShareholdersService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getShareholdersById(shareholderId: string): Observable<ShareholderModel> {
    return this.httpService.get(`shareholders/byId/${shareholderId}`);
  }

  getShareholdersByKey(key: string): Observable<ShareholderModel[]> {
    const params: Params = { key };
    return this.httpService.get(`shareholders/byKey`, { params });
  }

  getShareholdersCount(): Observable<number> {
    return this.httpService.get('shareholders/countShareholders');
  }

  getShareholdersByPage(pageIndex: number, pageSize: number): Observable<ShareholderModel[]> {
    return this.httpService.get(`shareholders/byPage/${pageIndex}/${pageSize}`);
  }

  create(shareholder: any): Observable<ShareholderModel> {
    return this.httpService.post('shareholders', { shareholder });
  }

  update(
    shareholder: any, 
    properties: PropertyModel[],
    movableProperties: MovablePropertyModel[],
    incomes: IncomeModel[],
    shareholderId: string
  ) {
    return this.httpService.put(`shareholders/${shareholderId}`, { shareholder, properties, movableProperties, incomes });
  }

}
