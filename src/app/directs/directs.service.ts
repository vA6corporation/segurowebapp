import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChequeModel } from '../cheques/cheque.model';
import { DepositModel } from '../deposits/deposit.model';
import { HttpService } from '../http.service';
import { MailModel } from '../mails/mail.model';
import { PaymentModel } from '../payments/payment.model';
import { DirectPdfModel } from './direct-pdf.model';
import { DirectModel } from './direct.model';

@Injectable({
  providedIn: 'root'
})
export class DirectsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getDirectsByKey(key: string): Observable<DirectModel[]> {
    return this.httpService.get(`directs/byKey/${key}`);
  }

  sendMail(directId: string): Observable<MailModel> {
    return this.httpService.get(`mails/${directId}/mailDirect`);
  }

  getDirectsCount(): Observable<number> {
    return this.httpService.get('directs/count');
  }

  getDirectById(directId: string): Observable<DirectModel> {
    return this.httpService.get(`directs/byId/${directId}`);
  }

  getDirectsByPage(pageIndex: number, pageSize: number): Observable<DirectModel[]> {
    return this.httpService.get(`directs/byPage/${pageIndex}/${pageSize}`)
  }

  getDirectsByCommercialPage(workerId: string, pageIndex: number, pageSize: number): Observable<DirectModel[]> {
    return this.httpService.get(`directs/byCommercialPage/${workerId}/${pageIndex}/${pageSize}`)
  }

  delete(directId: string): Observable<any> {
    return this.httpService.delete(`directs/${directId}`);
  }

  getDirectPdfs(directId: string, type: string): Observable<DirectPdfModel[]> {
    return this.httpService.get(`directs/pdfs/${directId}/${type}`);
  }

  uploadPdf(formData: FormData, directId: string, type: string, constructionId: string, attachAll: boolean): Observable<string> {
    return this.httpService.postForm(`directs/uploadPdf/${directId}/${type}/${constructionId}/${attachAll}`, formData);
  }

  deletePdf(pdfId: string): Observable<string> {
    return this.httpService.delete(`directs/deletePdf/${pdfId}`);
  }

  create(
    direct: any, 
    cheques: ChequeModel[], 
    deposits: DepositModel[], 
    officeId: string
  ): Observable<DirectModel> {
    return this.httpService.post(`directs/${officeId}`, { direct, cheques, deposits });
  }

  update(direct: any, directId: string): Observable<DirectModel> {
    return this.httpService.put(`directs/${directId}`, { direct });
  }

  updateStatus(status: string, directId: string): Observable<DirectModel> {
    return this.httpService.put(`directs/status/${directId}`, { status });
  }

  updateWithPayments(direct: any, payments: PaymentModel[], directId: string): Observable<DirectModel> {
    return this.httpService.put(`directs/withPayments/${directId}`, { direct, payments });
  }

}
