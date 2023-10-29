import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CertifierModel } from './certifier.model';

@Injectable({
  providedIn: 'root'
})
export class CertifiersService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  private certifiers$: BehaviorSubject<CertifierModel[]>|null = null;

  handleCertifiers(): Observable<CertifierModel[]> {
    if (this.certifiers$ == null) {
      this.certifiers$ = new BehaviorSubject<CertifierModel[]>([]);
      this.loadCertifiers();
    }
      
    return this.certifiers$.asObservable();
  }

  loadCertifiers() {
    this.httpService.get('certifiers').subscribe(certifiers => {
      this.certifiers$?.next(certifiers);
    });
  }

  getCountCertifiers() {
    return this.httpService.get('certifiers/countCertifiers');
  }

  getCertifierById(certifierId: string): Observable<CertifierModel> {
    return this.httpService.get(`certifiers/byId/${certifierId}`);
  }

  getCertifiersByPage(
    pageIndex: number,
    pageSize: number,
  ): Observable<CertifierModel[]> {
    return this.httpService.get(`certifiers/byPage/${pageIndex}/${pageSize}`);
  }

  create(certifier: any): Observable<CertifierModel> {
    return this.httpService.post('certifiers', { certifier })
  }

  update(certifier: any, certifierId: string): Observable<void> {
    return this.httpService.put(`certifiers/${certifierId}`, { certifier });
  }

}
