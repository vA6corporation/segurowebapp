import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http.service';
import { Guarantee } from '../reports/guarantee.interface';
import { FinancierModel } from './financier.model'

@Injectable({
  providedIn: 'root'
})
export class FinancierModelsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getFinancierModelsByPage(pageIndex: number, pageSize: number): Observable<FinancierModel[]> {
    return this.httpService.get(`financiers/${pageIndex}/${pageSize}`);
  }

  getFinancierModelsByKey(key: string): Observable<FinancierModel[]> {
    return this.httpService.get(`financiers/byAny/${key}`)
  }

  getFinancierModelById(financierId: string): Observable<any> {
    return this.httpService.get(`financiers/${financierId}`)
  }

  getCount(): Observable<number> {
    return this.httpService.get('financiers/count')
  }

  getEmitionGuaranties(financierId: string): Observable<Guarantee[]> {
    return this.httpService.get(`reports/${financierId}/emitionGuaranties`);
  }

  create(financier: FinancierModel): Observable<any> {
    return this.httpService.post('financiers', { financier });
  }

  update(financier: FinancierModel, financierId: string): Observable<any> {
    return this.httpService.put(`financiers/${financierId}`, { financier });
  }
}
