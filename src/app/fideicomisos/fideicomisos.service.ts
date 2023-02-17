import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { FideicomisoModel } from './fideicomiso.model';

@Injectable({
  providedIn: 'root'
})
export class FideicomisosService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getFideicomisoById(
    fideicomisoId: string
  ): Observable<FideicomisoModel> {
    return this.httpService.get(`fideicomisos/byId/${fideicomisoId}`);
  }

  getCountFideicomisos() {
    return this.httpService.get('fideicomisos/countFideicomisos');
  }

  getFideicomisos() {
    return this.httpService.get('fideicomisos');
  }

  getFideicomisosByPage(
    pageIndex: number, 
    pageSize: number
  ): Observable<FideicomisoModel[]> {
    return this.httpService.get(`fideicomisos/byPage/${pageIndex}/${pageSize}`);
  }

  create(fideicomiso: FideicomisoModel): Observable<FideicomisoModel> {
    return this.httpService.post('fideicomisos', { fideicomiso });
  }

  update(fideicomiso: FideicomisoModel, fideicomisoId: string): Observable<void> {
    return this.httpService.put(`fideicomisos/${fideicomisoId}`, { fideicomiso });
  }

  delete(fideicomisoId: string) {
    return this.httpService.delete(`fideicomisos/${fideicomisoId}`);
  }

}
