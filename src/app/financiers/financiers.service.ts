import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http.service';
import { Guarantee } from '../reports/guarantee.interface';
import { Financier } from './financier.model'

@Injectable({
  providedIn: 'root'
})
export class FinanciersService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getFinanciersByPage(pageIndex: number, pageSize: number): Observable<Financier[]> {
    return this.httpService.get(`financiers/${pageIndex}/${pageSize}`);
  }

  getFinanciersByAny(key: string): Observable<Financier[]> {
    return this.httpService.get(`financiers/byAny/${key}`)
  }

  getFinancierById(financierId: string): Observable<any> {
    return this.httpService.get(`financiers/${financierId}`)
  }

  getCount(): Observable<number> {
    return this.httpService.get('financiers/count')
  }

  getEmitionGuaranties(financierId: string): Observable<Guarantee[]> {
    return this.httpService.get(`reports/${financierId}/emitionGuaranties`);
  }

  create(financier: Financier): Observable<any> {
    return this.httpService.post('financiers', { financier });
  }

  update(financier: Financier, financierId: string): Observable<any> {
    return this.httpService.put(`financiers/${financierId}`, { financier });
  }
}
