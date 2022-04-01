import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cheque } from '../cheques/cheque.model';
import { Deposit } from '../deposits/deposit.model';
import { HttpService } from '../http.service';
import { Mail } from '../mails/mail.interface';
import { CompliancePdfModel } from './compliance-pdf.model';
import { Compliance } from './compliance.model';

@Injectable({
  providedIn: 'root'
})
export class CompliancesService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getCompliancesByAny(key: string): Observable<Compliance[]> {
    return this.httpService.get(`compliances/byAny/${key}`);
  }

  sendMail(complianceId: string): Observable<Mail> {
    return this.httpService.get(`mails/${complianceId}/mailCompliance`);
  }

  getCompliancesByPage(pageIndex: number, pageSize: number): Observable<Compliance[]> {
    return this.httpService.get(`compliances/byPage/${pageIndex}/${pageSize}`);
  }

  getCompliancesCount(): Observable<number> {
    return this.httpService.get('compliances/count');
  }

  getComplianceById(complianceId: string): Observable<Compliance> {
    return this.httpService.get(`compliances/byId/${complianceId}`);
  }

  create(compliance: Compliance, cheques: Cheque[], deposits: Deposit[]): Observable<Compliance> {
    return this.httpService.post('compliances', { compliance, cheques, deposits });
  }

  update(compliance: Compliance, complianceId: string): Observable<Compliance> {
    return this.httpService.put(`compliances/${complianceId}`, { compliance });
  }

  delete(complianceId: string): Observable<any> {
    return this.httpService.delete(`compliances/${complianceId}`);
  }

  getCompliancePdfs(complianceId: string, type: string): Observable<CompliancePdfModel[]> {
    return this.httpService.get(`compliances/pdfs/${complianceId}/${type}`);
  }

  uploadPdf(formData: FormData, complianceId: string, type: string): Observable<string> {
    return this.httpService.postForm(`compliances/uploadPdf/${complianceId}/${type}`, formData);
  }

  deletePdf(compliancePdfId: string, pdfId: string): Observable<string> {
    return this.httpService.delete(`compliances/deletePdf/${compliancePdfId}/${pdfId}`);
  }

}
