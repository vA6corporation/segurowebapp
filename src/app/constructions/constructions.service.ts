import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { Guarantee } from '../reports/guarantee.interface';
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

  deletePdf(constructionPdfId: string, pdfId: string): Observable<string> {
    return this.httpService.delete(`constructions/deletePdf/${constructionPdfId}/${pdfId}`);
  }

  uploadPdf(formData: FormData, constructionId: string): Observable<string> {
    return this.httpService.postForm(`constructions/uploadPdf/${constructionId}`, formData);
  }

  getConstructionsWithoutDocumentation(): Observable<ConstructionModel[]> {
    return this.httpService.get('constructions/withoutDocumentation');
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

  getGuarantiesByConstructionId(constructionId: string): Observable<Guarantee[]> {
    return this.httpService.get(`reports/byConstructionId/${constructionId}`);
  }

  getConstructionsByKey(key: string): Observable<ConstructionModel[]> {
    return this.httpService.get(`constructions/byKey/${key}`);
  }

  getConstructionsByPage(pageIndex: number, pageSize: number): Observable<ConstructionModel[]> {
    return this.httpService.get(`constructions/${pageIndex}/${pageSize}`);
  }

  create(construction: any): Observable<any> {
    return this.httpService.post('constructions', { construction });
  }

  update(construction: any, constructionId: string): Observable<void> {
    return this.httpService.put(`constructions/${constructionId}`, { construction });
  }

  delete(constructionId: string): Observable<void> {
    return this.httpService.delete(`constructions/${constructionId}`);
  }

}
