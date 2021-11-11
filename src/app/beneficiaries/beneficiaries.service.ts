import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { Beneficiary } from './beneficiary.model';

@Injectable({
  providedIn: 'root'
})
export class BeneficiariesService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getBeneficiariesByAny(key: string):Observable<Beneficiary[]> {
    return this.httpService.get(`beneficiaries/byAny/${key}`);
  }

  getBeneficiariesByPage(pageIndex: number, pageSize: number): Observable<Beneficiary[]> {
    return this.httpService.get(`beneficiaries/${pageIndex}/${pageSize}`);
  }

  getBeneficiariesCount(): Observable<number> {
    return this.httpService.get('beneficiaries/count');
  }

  getBeneficiaryById(beneficiaryId: string): Observable<Beneficiary> {
    return this.httpService.get(`beneficiaries/${beneficiaryId}`);
  }

  create(beneficiary: Beneficiary): Observable<Beneficiary> {
    return this.httpService.post('beneficiaries', { beneficiary });
  }

  update(beneficiary: Beneficiary, beneficiaryId: string): Observable<Beneficiary> {
    return this.httpService.put(`beneficiaries/${beneficiaryId}`, { beneficiary });
  }

}
