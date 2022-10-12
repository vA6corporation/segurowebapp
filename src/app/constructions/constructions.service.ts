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

  getPdfs(constructionId: string): Observable<ConstructionPdfModel[]> {
    return this.httpService.get(`constructions/pdfs/byConstructionId/${constructionId}`);
  }

  getConstructions(): Observable<ConstructionModel[]> {
    return this.httpService.get('constructions');
  }

  getConstructionsByOffice(): Observable<ConstructionModel[]> {
    return this.httpService.get('constructions/byOffice');
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

  uploadPdf(formData: FormData, constructionId: string): Observable<string> {
    return this.httpService.postForm(`constructions/uploadPdf/${constructionId}`, formData);
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

  getCountConstructionsByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<number> {
    return this.httpService.get(`constructions/countConstructionsByRangeDate/${startDate}/${endDate}`, { params });
  }

  getConstructionsByPage(pageIndex: number, pageSize: number): Observable<ConstructionModel[]> {
    return this.httpService.get(`constructions/${pageIndex}/${pageSize}`);
  }

  getConstructionsByRangeDatePage(
    startDate: Date, 
    endDate: Date, 
    pageIndex: number, 
    pageSize: number, 
    params: Params
  ): Observable<ConstructionModel[]> {
    return this.httpService.get(`constructions/${startDate}/${endDate}/${pageIndex}/${pageSize}`, { params });
  }

  create(construction: any): Observable<any> {
    return this.httpService.post('constructions', { construction });
  }

  update(construction: any, constructionId: string): Observable<void> {
    return this.httpService.put(`constructions/${constructionId}`, { construction });
  }

  updateOffice(constructionId: string, construction: any): Observable<void> {
    return this.httpService.put(`constructions/updateOffice/${constructionId}`, { construction });
  }

  delete(constructionId: string): Observable<void> {
    return this.httpService.delete(`constructions/${constructionId}`);
  }

}
