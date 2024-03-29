import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChequeModel } from '../cheques/cheque.model';
import { DepositModel } from '../deposits/deposit.model';
import { HttpService } from '../http.service';
import { MailModel } from '../mails/mail.model';
import { PaymentModel } from '../payments/payment.model';
import { CompliancePdfModel } from './compliance-pdf.model';
import { ComplianceModel } from './compliance.model';

@Injectable({
  providedIn: 'root'
})
export class CompliancesService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getCompliancesByKey(key: string): Observable<ComplianceModel[]> {
    return this.httpService.get(`compliances/byKey/${key}`);
  }

  sendMail(complianceId: string): Observable<MailModel> {
    return this.httpService.get(`mails/${complianceId}/mailCompliance`);
  }

  getCompliancesByPage(pageIndex: number, pageSize: number): Observable<ComplianceModel[]> {
    return this.httpService.get(`compliances/byPage/${pageIndex}/${pageSize}`);
  }

  getCompliancesByCommercialPage(workerId: string, pageIndex: number, pageSize: number): Observable<ComplianceModel[]> {
    return this.httpService.get(`compliances/byCommercialPage/${workerId}/${pageIndex}/${pageSize}`);
  }

  getCountCompliances(): Observable<number> {
    return this.httpService.get('compliances/countCompliances');
  }

  getComplianceById(complianceId: string): Observable<ComplianceModel> {
    return this.httpService.get(`compliances/byId/${complianceId}`);
  }

  delete(complianceId: string): Observable<any> {
    return this.httpService.delete(`compliances/${complianceId}`);
  }

  getCompliancePdfs(complianceId: string, type: string): Observable<CompliancePdfModel[]> {
    return this.httpService.get(`compliances/pdfs/${complianceId}/${type}`);
  }

  uploadPdf(formData: FormData, complianceId: string, type: string, constructionId: string, attachAll: boolean): Observable<string> {
    return this.httpService.postForm(`compliances/uploadPdf/${complianceId}/${type}/${constructionId}/${attachAll}`, formData);
  }

  deletePdf(pdfId: string): Observable<string> {
    return this.httpService.delete(`compliances/deletePdf/${pdfId}`);
  }

  create(
    compliance: any, 
    cheques: ChequeModel[], 
    deposits: DepositModel[], 
    officeId: string
  ): Observable<ComplianceModel> {
    return this.httpService.post(`compliances/${officeId}`, { compliance, cheques, deposits });
  }

  update(compliance: any, complianceId: string): Observable<ComplianceModel> {
    return this.httpService.put(`compliances/${complianceId}`, { compliance });
  }

  updateStatus(status: string, complianceId: string): Observable<ComplianceModel> {
    return this.httpService.put(`compliances/status/${complianceId}`, { status });
  }

  updateWithPayments(compliance: any, payments: PaymentModel[], complianceId: string): Observable<ComplianceModel> {
    return this.httpService.put(`compliances/withPayments/${complianceId}`, { compliance, payments });
  }

}
