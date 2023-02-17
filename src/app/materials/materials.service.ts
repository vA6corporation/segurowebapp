import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChequeModel } from '../cheques/cheque.model';
import { DepositModel } from '../deposits/deposit.model';
import { HttpService } from '../http.service';
import { MailModel } from '../mails/mail.model';
import { MaterialPdfModel } from './material-pdf.model';
import { MaterialModel }from './material.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  sendMail(materialId: string): Observable<MailModel> {
    return this.httpService.get(`mails/${materialId}/mailMaterial`);
  }

  getMaterialsByKey(key: string): Observable<MaterialModel[]> {
    return this.httpService.get(`materials/byKey/${key}`);
  }

  getMaterialsByPage(pageIndex: number, pageSize: number): Observable<MaterialModel[]> {
    return this.httpService.get(`materials/byPage/${pageIndex}/${pageSize}`);
  }

  getMaterialsByCommercialPage(workerId: string, pageIndex: number, pageSize: number): Observable<MaterialModel[]> {
    return this.httpService.get(`materials/byCommercialPage/${workerId}/${pageIndex}/${pageSize}`);
  }

  getMaterialsCount(): Observable<number> {
    return this.httpService.get('materials/count');
  }
  
  getMaterialById(materialId: string): Observable<MaterialModel> {
    return this.httpService.get(`materials/byId/${materialId}`);
  }

  delete(materialId: string): Observable<any> {
    return this.httpService.delete(`materials/${materialId}`);
  }

  getMaterialPdfs(materialId: string, type: string): Observable<MaterialPdfModel[]> {
    return this.httpService.get(`materials/pdfs/${materialId}/${type}`);
  }

  uploadPdf(formData: FormData, materialId: string, type: string, constructionId: string, attachAll: boolean): Observable<string> {
    return this.httpService.postForm(`materials/uploadPdf/${materialId}/${type}/${constructionId}/${attachAll}`, formData);
  }

  deletePdf(pdfId: string): Observable<string> {
    return this.httpService.delete(`materials/deletePdf/${pdfId}`);
  }

  create(material: any, financier: any, cheques: ChequeModel[], deposits: DepositModel[], officeId: string): Observable<MaterialModel> {
    return this.httpService.post(`materials/${officeId}`, { material, financier, cheques, deposits });
  }

  update(material: any, materialId: string): Observable<MaterialModel> {
    return this.httpService.put(`materials/${materialId}`, { material });
  }

  updateStatus(status: string, materialId: string): Observable<MaterialModel> {
    return this.httpService.put(`materials/status/${materialId}`, { status });
  }

  updateWithFinanicer(material: any, financier: any, materialId: string): Observable<MaterialModel> {
    return this.httpService.put(`materials/${materialId}`, { material, financier });
  }

}
