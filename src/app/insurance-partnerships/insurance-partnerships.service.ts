import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { PartnershipModel } from '../partnerships/partnership.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancePartnershipsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getPartnershipsByKey(key: string): Observable<PartnershipModel[]> {
    return this.httpService.get(`insurancePartnerships/byAny/${key}`);
  }

  getPartnerships(): Observable<PartnershipModel[]> {
    return this.httpService.get('insurancePartnerships');
  }

  getPartnershipsByPage(pageIndex: number, pageSize: number): Observable<PartnershipModel[]> {
    return this.httpService.get(`insurancePartnerships/${pageIndex}/${pageSize}`); 
  }

  getPartnershipsCount(): Observable<number> {
    return this.httpService.get('insurancePartnerships/count');
  }

  getPartnershipById(partnershipId: string) {
    return this.httpService.get(`insurancePartnerships/${partnershipId}`);
  }

  create(partnership: PartnershipModel): Observable<PartnershipModel> {
    return this.httpService.post('insurancePartnerships', { partnership });
  }

  update(partnership: PartnershipModel, partnershipId: string): Observable<PartnershipModel> {
    return this.httpService.put(`insurancePartnerships/${partnershipId}`, { partnership });
  }
  
}
