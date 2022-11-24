import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpSeaceService } from '../http-seace.service';

@Injectable({
  providedIn: 'root'
})
export class SeaceService {

  constructor(
    private readonly httpSeaceService: HttpSeaceService,
  ) { }

  getSeaceDatasByPage(pageIndex: number, pageSize: number, params: Params): Observable<any[]> {
    return this.httpSeaceService.get(`seaceDatasByPage/${pageIndex}/${pageSize}`, { params });
  }

  getCountSeaceDatas(params: Params): Observable<number> {
    return this.httpSeaceService.get(`countSeaceDatas`, { params });
  }
  
}
