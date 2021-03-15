import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http.service';
import { Partnership } from './partnership.model';

@Injectable({
  providedIn: 'root'
})
export class PartnershipsService {

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
  ) { }

  getPartnershipsByAny(key: string): Observable<Partnership[]> {
    return this.httpService.get(`partnerships/byAny/${key}`);
  }

  getPartnershipsByPage(pageIndex: number, pageSize: number): Observable<Partnership[]> {
    return this.httpService.get(`partnerships/${pageIndex}/${pageSize}`); 
  }

  getPartnershipsCount(): Observable<number> {
    return this.httpService.get('partnerships/count');
  }

  getPartnershipById(partnershipId: string) {
    return this.httpService.get(`partnerships/${partnershipId}`);
  }

  create(partnership: Partnership): Observable<Partnership> {
    partnership.businessId = this.authService.businessId;
    partnership.userId = this.authService.userId;
    return this.httpService.post('partnerships', { partnership });
  }

  update(partnership: Partnership, partnershipId: string): Observable<Partnership> {
    return this.httpService.put(`partnerships/${partnershipId}`, { partnership });
  }
}
