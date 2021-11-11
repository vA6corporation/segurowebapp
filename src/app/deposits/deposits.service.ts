import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http.service';
import { Deposit } from './deposit.model';

@Injectable({
  providedIn: 'root'
})
export class DepositsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  create(deposit: Deposit): Observable<Deposit> {
    return this.httpService.post('deposits', { deposit });
  }

  update(deposit: Deposit, depositId: string): Observable<Deposit> {
    return this.httpService.put(`deposits/${depositId}`, { deposit });
  }

  deleteOne(depositId: string): Observable<any> {
    return this.httpService.delete(`deposits/${depositId}`);
  }
}
