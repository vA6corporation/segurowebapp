import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { BankModel } from './bank.model';
import { ProviderModel } from './provider.model';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getProvidersByKey(key: string): Observable<ProviderModel[]> {
    return this.httpService.get(`providers/byKey/${key}`);
  }

  // getProvidersByDocument(document: string, documentType: string): Observable<ProviderModel[]> {
  //   return this.httpService.get(`providers/byDocument/${document}/${documentType}`);
  // }

  getProvidersByDocument(document: string, documentType: string): Observable<ProviderModel[]> {
    return this.httpService.get(`providers/byDocument/${document}/${documentType}`);
  }

  // getProvidersByDni(key: string): Observable<ProviderModel[]> {
  //   return this.httpService.get(`providers/byDni/${key}`);
  // }

  getProvidersByPage(pageIndex: number, pageSize: number): Observable<ProviderModel[]> {
    return this.httpService.get(`providers/byPage/${pageIndex}/${pageSize}`);
  }

  getProvidersCount(): Observable<number> {
    return this.httpService.get('providers/count');
  }

  getProviderById(providerId: string): Observable<ProviderModel> {
    return this.httpService.get(`providers/byId/${providerId}`);
  }

  update(provider: ProviderModel, banks: BankModel[], providerId: string): Observable<ProviderModel> {
    return this.httpService.put(`providers/${providerId}`, { provider, banks });
  }

  create(provider: ProviderModel, banks: BankModel[]) {
    return this.httpService.post('providers', { provider, banks });
  }

  delete(providerId: string) {
    return this.httpService.delete(`providers/${providerId}`);
  }
}
