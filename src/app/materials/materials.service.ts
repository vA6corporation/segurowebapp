import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cheque } from '../cheques/cheque.model';
import { Deposit } from '../deposits/deposit.model';
import { HttpService } from '../http.service';
import { Mail } from '../mails/mail.interface';
import { MaterialPdfModel } from './material-pdf.model';
import { Material }from './material.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  sendMail(materialId: string): Observable<Mail> {
    return this.httpService.get(`mails/${materialId}/mailMaterial`);
  }

  getMaterialsByKey(key: string): Observable<Material[]> {
    return this.httpService.get(`materials/byAny/${key}`);
  }

  getMaterialsByPage(pageIndex: number, pageSize: number): Observable<Material[]> {
    return this.httpService.get(`materials/byPage/${pageIndex}/${pageSize}`);
  }

  getMaterialsByCommercialPage(workerId: string, pageIndex: number, pageSize: number): Observable<Material[]> {
    return this.httpService.get(`materials/byCommercialPage/${workerId}/${pageIndex}/${pageSize}`);
  }

  getMaterialsCount(): Observable<number> {
    return this.httpService.get('materials/count');
  }
  
  getMaterialById(materialId: string): Observable<Material> {
    return this.httpService.get(`materials/byId/${materialId}`);
  }

  create(material: Material, cheques: Cheque[], deposits: Deposit[]): Observable<Material> {
    return this.httpService.post('materials', { material, cheques, deposits });
  }

  update(material: Material, materialId: string): Observable<Material> {
    return this.httpService.put(`materials/${materialId}`, { material });
  }

  delete(materialId: string): Observable<any> {
    return this.httpService.delete(`materials/${materialId}`);
  }

  getMaterialPdfs(materialId: string, type: string): Observable<MaterialPdfModel[]> {
    return this.httpService.get(`materials/pdfs/${materialId}/${type}`);
  }

  uploadPdf(formData: FormData, materialId: string, type: string): Observable<string> {
    return this.httpService.postForm(`materials/uploadPdf/${materialId}/${type}`, formData);
  }

  deletePdf(materialPdfId: string, pdfId: string): Observable<string> {
    return this.httpService.delete(`materials/deletePdf/${materialPdfId}/${pdfId}`);
  }

}
