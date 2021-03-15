import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http.service';
import { Compliance } from './compliance.model';

@Injectable({
  providedIn: 'root'
})
export class CompliancesService {

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
  ) { }

  getCompliancesByAny(key: string): Observable<Compliance[]> {
    return this.httpService.get(`compliances/byAny/${key}`);
  }

  sendMail(complianceId: string): Observable<Compliance> {
    return this.httpService.get(`mails/${complianceId}/mailCompliance`);
  }

  getCompliancesByPage(pageIndex: number, pageSize: number): Observable<Compliance[]> {
    return this.httpService.get(`compliances/${pageIndex}/${pageSize}`);
  }

  getCompliancesCount(): Observable<number> {
    return this.httpService.get('compliances/count');
  }

  getComplianceById(complianceId: string): Observable<Compliance> {
    return this.httpService.get(`compliances/${complianceId}`);
  }

  create(compliance: Compliance): Observable<Compliance> {
    compliance.businessId = this.authService.businessId;
    compliance.userId = this.authService.userId;
    return this.httpService.post('compliances', { compliance });
  }

  update(compliance: Compliance, complianceId: string): Observable<Compliance> {
    return this.httpService.put(`compliances/${complianceId}`, { compliance });
  }
}
