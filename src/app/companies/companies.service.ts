import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpService } from '../http.service';
import { CompanyModel } from './company.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(
    private readonly httpService: HttpService,  
  ) { }

  private companies: CompanyModel[] = [];
  private companies$: Subject<CompanyModel[]> = new Subject();

  handleCompanies(): Observable<CompanyModel[]> {
    if (this.companies.length === 0) {
      this.loadCompanies();
    } else {
      setTimeout(() => {
        this.companies$.next(this.companies);
      });
    }
    return this.companies$.asObservable();
  }

  loadCompanies(): void {
    this.httpService.get('companies').subscribe(companies => {
      this.companies$.next(companies);
    });
  }

  getCompanyById(companyId: string): Observable<CompanyModel> {
    return this.httpService.get(`companies/byId/${companyId}`);
  }

  getCompanies(): Observable<CompanyModel[]> {
    return this.httpService.get('companies');
  }

  create(company: any): Observable<CompanyModel> {
    return this.httpService.post('companies', { company });
  }

  update(company: any, companyId: string): Observable<void> {
    return this.httpService.put(`companies/${companyId}`, { company });
  }

}
