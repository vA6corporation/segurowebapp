import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { GuaranteeModel } from '../guarantees/guarantee.model';
import { HttpService } from '../http.service';
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
    return this.httpService.get(`financiers/byKey/${key}`)
  }

  getFinancierModelById(financierId: string): Observable<any> {
    return this.httpService.get(`financiers/${financierId}`)
  }

  getCount(): Observable<number> {
    return this.httpService.get('financiers/count')
  }

  getEmitionGuaranties(financierId: string): Observable<GuaranteeModel[]> {
    return this.httpService.get(`reports/${financierId}/emitionGuaranties`);
  }

  create(financier: FinancierModel): Observable<any> {
    return this.httpService.post('financiers', { financier });
  }

  update(financier: FinancierModel, financierId: string): Observable<any> {
    return this.httpService.put(`financiers/${financierId}`, { financier });
  }
}
