import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getGuaranties(params: Params): Observable<any> {
    return this.httpService.get('reports/documentation', params);
  }
}
