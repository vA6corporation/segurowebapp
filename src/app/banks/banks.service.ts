import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { BankModel } from '../providers/bank.model';

@Injectable({
  providedIn: 'root'
})
export class BanksService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getBankById(bankId: string): Observable<BankModel> {
    return this.httpService.get(`banks/byId/${bankId}`);
  }

  getBanks(): Observable<BankModel[]> {
    return this.httpService.get('banks');
  }

  create(bank: BankModel): Observable<BankModel> {
    return this.httpService.post('banks', { bank });
  }

  update(bank: BankModel, bankId: string): Observable<void> {
    return this.httpService.put(`banks/${bankId}`, { bank });
  }

}
