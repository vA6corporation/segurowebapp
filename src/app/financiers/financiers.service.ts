import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http.service';
import { Financier } from './financier.model'

@Injectable({
  providedIn: 'root'
})
export class FinanciersService {

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
  ) {}

  getFinanciersByPage(pageIndex: number, pageSize: number): Observable<Financier[]> {
    return this.httpService.get(`financiers/${pageIndex}/${pageSize}`);
  }

  getFinancierById(financierId: string): Observable<any> {
    return this.httpService.get(`financiers/${financierId}`)
  }

  getCount(): Observable<number> {
    return this.httpService.get('financiers/count')
  }

  create(financier: Financier): Observable<any> {
    financier.businessId = this.authService.businessId;
    return this.httpService.post('financiers', { financier });
  }

  update(financier: Financier, financierId: string): Observable<any> {
    return this.httpService.put(`financiers/${financierId}`, { financier });
  }
}
