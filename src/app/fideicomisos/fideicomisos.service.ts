import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { PaymentModel } from '../payments/payment.model';
import { FideicomisoModel } from './fideicomiso.model';
import { FideicomisoPdfModel } from './fideicomiso-pdf.model';

@Injectable({
  providedIn: 'root'
})
export class FideicomisosService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getPdfs(fideicomisoId: string, type: string): Observable<FideicomisoPdfModel[]> {
    return this.httpService.get(`fideicomisoPdfs/${fideicomisoId}/${type}`)
  }

  deletePdf(pdfId: string): Observable<void> {
    return this.httpService.delete(`fideicomisoPdfs/${pdfId}`);
  }

  uploadFile(formData: FormData, fideicomisoId: string, type: string): Observable<string> {
    return this.httpService.postForm(`fideicomisoPdfs/${fideicomisoId}/${type}`, formData);
  }

  getFideicomisoById(
    fideicomisoId: string
  ): Observable<FideicomisoModel> {
    return this.httpService.get(`fideicomisos/byId/${fideicomisoId}`);
  }

  getCountFideicomisos() {
    return this.httpService.get('fideicomisos/countFideicomisos');
  }

  getFideicomisos() {
    return this.httpService.get('fideicomisos');
  }

  getFideicomisosByPage(
    pageIndex: number, 
    pageSize: number
  ): Observable<FideicomisoModel[]> {
    return this.httpService.get(`fideicomisos/byPage/${pageIndex}/${pageSize}`);
  }

  getIsos(): Observable<FideicomisoPdfModel[]> {
    return this.httpService.get(`fideicomisoPdfs/`)
  }

  create(fideicomiso: FideicomisoModel): Observable<FideicomisoModel> {
    return this.httpService.post('fideicomisos', { fideicomiso });
  }

  update(fideicomiso: FideicomisoModel, payments: PaymentModel[], fideicomisoId: string): Observable<void> {
    return this.httpService.put(`fideicomisos/${fideicomisoId}`, { fideicomiso, payments });
  }

  delete(fideicomisoId: string) {
    return this.httpService.delete(`fideicomisos/${fideicomisoId}`);
  }

}
