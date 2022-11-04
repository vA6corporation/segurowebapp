import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { GuaranteeModel } from '../guarantees/guarantee.model';
import { HttpService } from '../http.service';
import { ConstructionPdfModel } from './construction-pdf.model';
import { ConstructionModel } from './construction.model';

@Injectable({
  providedIn: 'root'
})
export class ConstructionsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getPdfs(type: string, constructionId: string): Observable<ConstructionPdfModel[]> {
    return this.httpService.get(`constructions/pdfs/byConstructionId/${type}/${constructionId}`);
  }

  getConstructions(): Observable<ConstructionModel[]> {
    return this.httpService.get('constructions');
  }

  getConstructionsByPercentCompletion(percentCompletionCode: string): Observable<ConstructionModel[]> {
    return this.httpService.get(`constructions/byPercentCompletionCode/${percentCompletionCode}`);
  }

  getConstructionsByOffice(): Observable<ConstructionModel[]> {
    return this.httpService.get('constructions/byOffice');
  }

  getSummaryCompletions(constructionCode: string, percentCompletionCode: string): Observable<any> {
    const params = { constructionCode, percentCompletionCode };
    return this.httpService.get(`constructions/summaryCompletions`, { params });
  }

  getDebtorConstructions(): Observable<any> {
    return this.httpService.get(`constructions/debtorConstructions`);
  }

  getConstructionsByBusiness(businessId: string): Observable<ConstructionModel[]> {
    return this.httpService.get(`constructions/byBusiness/${businessId}`);
  }

  getConstructionsByRangeDateFinancierWorkerStatus(params: Params): Observable<ConstructionModel[]> {
    return this.httpService.get('constructions/byRangeDateFinancierWorkerStatus', { params });
  }

  deletePdf(constructionPdfId: string, pdfId: string): Observable<string> {
    return this.httpService.delete(`constructions/deletePdf/${constructionPdfId}/${pdfId}`);
  }

  uploadPdf(
    formData: FormData,
    type: string, 
    constructionId: string
  ): Observable<string> {
    return this.httpService.postForm(`constructions/uploadPdf/${type}/${constructionId}`, formData);
  }

  getConstructionsWithoutDocumentation(params: Params): Observable<ConstructionModel[]> {
    return this.httpService.get('constructions/withoutDocumentation', { params });
  }

  getConstructionsWithoutDocumentationByKey(key: string): Observable<ConstructionModel[]> {
    return this.httpService.get(`constructions/withoutDocumentationByKey/${key}`);
  }

  getCountConstructionsWithoutDocumentation(): Observable<number> {
    return this.httpService.get('constructions/countWithoutDocumentation');
  }

  getCountConstructions(): Observable<number> {
    return this.httpService.get(`constructions/countConstructions`);
  }

  getConstructionById(constructionId: string): Observable<ConstructionModel> {
    return this.httpService.get(`constructions/byId/${constructionId}`);
  }

  getGuarantiesByConstructionId(constructionId: string): Observable<GuaranteeModel[]> {
    return this.httpService.get(`reports/byConstructionId/${constructionId}`);
  }

  getConstructionsByKey(key: string): Observable<ConstructionModel[]> {
    return this.httpService.get(`constructions/byKey/${key}`);
  }

  getCountConstructionsByRangeDate(params: Params): Observable<number> {
    return this.httpService.get(`constructions/countConstructionsByRangeDate`, { params });
  }

  getConstructionsByPage(pageIndex: number, pageSize: number): Observable<ConstructionModel[]> {
    return this.httpService.get(`constructions/${pageIndex}/${pageSize}`);
  }

  getConstructionsByRangeDatePage(
    // startDate: Date, 
    // endDate: Date, 
    pageIndex: number, 
    pageSize: number, 
    params: Params
  ): Observable<ConstructionModel[]> {
    return this.httpService.get(`constructions/byRangeDatePage/${pageIndex}/${pageSize}`, { params });
  }

  create(construction: any, percentCompletions: any[], payments: any[]): Observable<any> {
    return this.httpService.post('constructions', { construction, percentCompletions, payments });
  }

  update(construction: any, percentCompletions: any[], payments: any[], constructionId: string): Observable<void> {
    return this.httpService.put(`constructions/${constructionId}`, { construction, percentCompletions, payments });
  }

  updateOffice(constructionId: string, construction: any): Observable<void> {
    return this.httpService.put(`constructions/updateOffice/${constructionId}`, { construction });
  }

  delete(constructionId: string): Observable<void> {
    return this.httpService.delete(`constructions/${constructionId}`);
  }

}
