import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstructionModel } from '../constructions/construction.model';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceConstructionsService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getCountConstructions(): Observable<number> {
    return this.httpService.get(`insuranceConstructions/countConstructions`);
  }

  getConstructionById(constructionId: string): Observable<ConstructionModel> {
    return this.httpService.get(`insuranceConstructions/byId/${constructionId}`);
  }

  getConstructionsByKey(key: string): Observable<ConstructionModel[]> {
    return this.httpService.get(`insuranceConstructions/byKey/${key}`);
  }

  getConstructionsByPage(pageIndex: number, pageSize: number): Observable<ConstructionModel[]> {
    return this.httpService.get(`insuranceConstructions/${pageIndex}/${pageSize}`);
  }

  create(construction: any): Observable<any> {
    return this.httpService.post('insuranceConstructions', { construction });
  }

  update(construction: any, constructionId: string): Observable<void> {
    return this.httpService.put(`insuranceConstructions/${constructionId}`, { construction });
  }

  delete(constructionId: string): Observable<void> {
    return this.httpService.delete(`insuranceConstructions/${constructionId}`);
  }

}
