import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { PaymentModel } from '../payments/payment.model';
import { IsoModel } from './iso.model';
import { IsoPdfModel } from './iso-pdf.model';

@Injectable({
  providedIn: 'root'
})
export class IsosService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getPdfs(isoId: string, type: string): Observable<IsoPdfModel[]> {
    return this.httpService.get(`isoPdfs/${isoId}/${type}`)
  }

  deletePdf(pdfId: string): Observable<void> {
    return this.httpService.delete(`isoPdfs/${pdfId}`);
  }

  uploadFile(formData: FormData, isoId: string, type: string): Observable<string> {
    return this.httpService.postForm(`isoPdfs/${isoId}/${type}`, formData);
  }

  getIsoById(isoId: string): Observable<IsoModel> {
    return this.httpService.get(`isos/byId/${isoId}`);
  }

  getCountIsos() {
    return this.httpService.get('isos/countIsos');
  }

  getIsos(): Observable<IsoModel[]> {
    return this.httpService.get('isos');
  }

  getIsosByPage(pageIndex: number, pageSize: number): Observable<IsoModel[]> {
    return this.httpService.get(`isos/byPage/${pageIndex}/${pageSize}`);
  }

  create(iso: IsoModel): Observable<IsoModel> {
    return this.httpService.post('isos', { iso });
  }

  update(iso: IsoModel, payments: PaymentModel[], isoId: string): Observable<void> {
    return this.httpService.put(`isos/${isoId}`, { iso, payments });
  }

  delete(isoId: string) {
    return this.httpService.delete(`isos/${isoId}`);
  }

}
