import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { DepositModel } from './deposit.model';

@Injectable({
  providedIn: 'root'
})
export class DepositsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  create(deposit: DepositModel): Observable<DepositModel> {
    return this.httpService.post('deposits', { deposit });
  }

  update(deposit: DepositModel, depositId: string): Observable<DepositModel> {
    return this.httpService.put(`deposits/${depositId}`, { deposit });
  }

  deleteOne(depositId: string): Observable<any> {
    return this.httpService.delete(`deposits/${depositId}`);
  }
}
