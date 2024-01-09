import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { InvestmentModel } from './investment.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getInvestmentById(investmentId: string): Observable<InvestmentModel> {
    return this.httpService.get(`investments/byId/${investmentId}`);
  }

  getInvestmentsByKey(key: string): Observable<InvestmentModel[]> {
    const params: Params = { key };
    return this.httpService.get('investments/byKey', params);
  }

  getInvestmentsByPage(pageIndex: number, pageSize: number): Observable<InvestmentModel[]> {
    return this.httpService.get(`investments/byPage/${pageIndex}/${pageSize}`);
  }

  getInvestmentsCount(): Observable<number> {
    return this.httpService.get(`investments/count`);
  }

  create(investment: any): Observable<InvestmentModel> {
    return this.httpService.post('investments', { investment });
  }

  update(investment: any, investmentId: string): Observable<void> {
    return this.httpService.put(`investments/${investmentId}`, { investment });
  }

}
