import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { CapitalIncreaseModel } from './capital-increase.model';
import { PaymentModel } from '../payments/payment.model';

@Injectable({
  providedIn: 'root'
})
export class CapitalIncreasesService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getCapitalIncreaseById(
    capitalIncreaseId: string
  ): Observable<CapitalIncreaseModel> {
    return this.httpService.get(`capitalIncreases/byId/${capitalIncreaseId}`);
  }

  getCapitalIncreasesByPage(
    pageIndex: number,
    pageSize: number,
  ): Observable<CapitalIncreaseModel[]> {
    return this.httpService.get(`capitalIncreases/byPage/${pageIndex}/${pageSize}`);
  }

  create(
    capitalIncrease: any,
  ): Observable<CapitalIncreaseModel> {
    return this.httpService.post('capitalIncreases', { capitalIncrease });
  }

  update(
    capitalIncrease: any, 
    payments: PaymentModel[], 
    capitalIncreaseId: string
  ): Observable<void> {
    return this.httpService.put(`capitalIncrease/${capitalIncreaseId}`, { capitalIncrease, payments });
  }

}
