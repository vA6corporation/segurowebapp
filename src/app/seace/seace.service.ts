import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpSeaceService } from '../http-seace.service';

@Injectable({
  providedIn: 'root'
})
export class SeaceService {

  constructor(
    private readonly httpService: HttpSeaceService
  ) { }

  getSeaceDatasByPage(pageIndex: number, pageSize: number, params: Params): Observable<any[]> {
    return this.httpService.get(`seace/seaceDatasByPage/${pageIndex}/${pageSize}`, { params });
  }

  getCountSeaceDatas(params: Params): Observable<number> {
    return this.httpService.get(`seace/countSeaceDatas`, { params });
  }
  
}
