import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { PartnershipModel } from './partnership.model';

@Injectable({
  providedIn: 'root'
})
export class PartnershipsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getPartnershipsByAny(key: string): Observable<PartnershipModel[]> {
    return this.httpService.get(`partnerships/byAny/${key}`);
  }

  getPartnerships(): Observable<PartnershipModel[]> {
    return this.httpService.get('partnerships');
  }

  getPartnershipsByPage(pageIndex: number, pageSize: number): Observable<PartnershipModel[]> {
    return this.httpService.get(`partnerships/${pageIndex}/${pageSize}`); 
  }

  getPartnershipsCount(): Observable<number> {
    return this.httpService.get('partnerships/count');
  }

  getPartnershipById(partnershipId: string) {
    return this.httpService.get(`partnerships/${partnershipId}`);
  }

  create(partnership: PartnershipModel): Observable<PartnershipModel> {
    return this.httpService.post('partnerships', { partnership });
  }

  update(partnership: PartnershipModel, partnershipId: string): Observable<PartnershipModel> {
    return this.httpService.put(`partnerships/${partnershipId}`, { partnership });
  }
}
