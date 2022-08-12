import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { CreditPdfModel } from './credit-pdf.model';
import { CreditModel } from './credit.model';

@Injectable({
  providedIn: 'root'
})
export class CreditsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getSummary(startDate: string, endDate: string, params: Params): Observable<any> {
    return this.httpService.get(`credits/summaryByDate/${startDate}/${endDate}`, { params });
  }

  getSummaryByYear(year: string, params: Params): Observable<any[]> {
    return this.httpService.get(`credits/summaryByYear/${year}`, { params });
  }

  getSummaryMonthsByYear(year: string): Observable<any[]> {
    return this.httpService.get(`credits/summaryMonthsByYear/${year}`);
  }

  // getSummaryPrimasByYear(year: string): Observable<any[]> {
  //   return this.httpService.get(`credits/summaryPrimasByYear/${year}`);
  // }

  getCreditsByPage(pageIndex: number, pageSize: number): Observable<CreditModel[]> {
    return this.httpService.get(`credits/byPage/${pageIndex}/${pageSize}`);
  }

  getCountCredits(): Observable<number> {
    return this.httpService.get(`credits/countCredits`);
  }

  getCreditsByKey(key: string): Observable<CreditModel[]> {
    return this.httpService.get(`credits/byKey/${key}`);
  }

  getCreditById(creditId: string): Observable<CreditModel> {
    return this.httpService.get(`credits/byId/${creditId}`);
  }

  create(credit: any): Observable<CreditModel> {
    return this.httpService.post('credits', { credit });
  }

  update(credit: any, creditId: string): Observable<void> {
    return this.httpService.put(`credits/${creditId}`, { credit });
  }

  getPdfs(creditId: string, type: string): Observable<CreditPdfModel[]> {
    return this.httpService.get(`credits/pdfs/${creditId}/${type}`);
  }

  uploadPdf(formData: FormData, creditId: string, type: string): Observable<string> {
    return this.httpService.postForm(`credits/uploadPdf/${creditId}/${type}`, formData);
  }

  deletePdf(creditPdfId: string, pdfId: string): Observable<void> {
    return this.httpService.delete(`credits/deletePdf/${creditPdfId}/${pdfId}`);
  }

  delete(creditId: string): Observable<void> {
    return this.httpService.delete(`credits/${creditId}`);
  }

}
