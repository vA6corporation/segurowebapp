import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { PartnershipItemModel } from './partnership-item.model';
import { PartnershipModel } from './partnership.model';

@Injectable({
  providedIn: 'root'
})
export class PartnershipsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getPartnershipsByKey(key: string): Observable<PartnershipModel[]> {
    return this.httpService.get(`partnerships/byKey/${key}`);
  }

  getTemplatePartnershipsByKey(key: string): Observable<PartnershipModel[]> {
    return this.httpService.get(`partnerships/templatePartnershipsByKey/${key}`);
  }

  getPartnerships(): Observable<PartnershipModel[]> {
    return this.httpService.get('partnerships');
  }

  getPartnershipsByPage(pageIndex: number, pageSize: number, params: Params): Observable<PartnershipModel[]> {
    return this.httpService.get(`partnerships/byPage/${pageIndex}/${pageSize}`, { params }); 
  }

  getTemplatePartnershipsByPage(pageIndex: number, pageSize: number): Observable<PartnershipModel[]> {
    return this.httpService.get(`partnerships/templatePartnershipsByPage/${pageIndex}/${pageSize}`); 
  }

  getPartnershipsCount(params: Params): Observable<number> {
    return this.httpService.get('partnerships/countPartnerships', { params });
  }

  getTemplatePartnershipsCount(): Observable<number> {
    return this.httpService.get('partnerships/countTemplatePartnerships');
  }

  getPartnershipById(partnershipId: string): Observable<PartnershipModel> {
    return this.httpService.get(`partnerships/byId/${partnershipId}`);
  }

  create(partnership: PartnershipModel, partnershipItems: PartnershipItemModel[]): Observable<PartnershipModel> {
    return this.httpService.post('partnerships', { partnership, partnershipItems });
  }

  update(partnership: PartnershipModel, partnershipItems: PartnershipItemModel[], partnershipId: string): Observable<PartnershipModel> {
    return this.httpService.put(`partnerships/${partnershipId}`, { partnership, partnershipItems });
  }

  delete(partnershipId: string): Observable<void> {
    return this.httpService.delete(`partnerships/${partnershipId}`);
  }
  
}
