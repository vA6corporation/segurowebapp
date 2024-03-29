import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { SeaceDataModel } from './seace-data.model';
import { SeaceErrorModel } from './seace-error.model';
import { HttpService } from '../http.service';

@Injectable({
    providedIn: 'root'
})
export class SeaceService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getSeaceDatasByKey(key: string, params: Params): Observable<SeaceDataModel[]> {
        Object.assign(params, { key });
        return this.httpService.get(`seace/byKey`, params);
    }

    getSeaceErrorsByKey(key: string, params: Params): Observable<SeaceErrorModel[]> {
        Object.assign(params, { key });
        return this.httpService.get(`seace/seaceErrors/byKey`, params);
    }

    getBusinessOfferPdfsBySeaceData(seaceDataId: string): Observable<any[]> {
        return this.httpService.get(`seace/businessOfferPdfsBySeaceData/${seaceDataId}`);
    }

    getBusinessBasePdfsBySeaceData(seaceDataId: string): Observable<any[]> {
        return this.httpService.get(`seace/businessBasePdfsBySeaceData/${seaceDataId}`);
    }

    getSeaceDatasByPage(pageIndex: number, pageSize: number, params: Params): Observable<any[]> {
        return this.httpService.get(`seace/seaceDatasByPage/${pageIndex}/${pageSize}`, params);
    }

    getCountSeaceDatas(params: Params): Observable<number> {
        return this.httpService.get(`seace/countSeaceDatas`, params);
    }

    getSeaceErrosByPage(pageIndex: number, pageSize: number): Observable<SeaceErrorModel[]> {
        return this.httpService.get(`seace/seaceErrorsByPage/${pageIndex}/${pageSize}`);
    }

    getCountSeaceErrors(): Observable<number> {
        return this.httpService.get('seace/countSeaceErrors');
    }

    update(seaceData: any, seaceDataId: string): Observable<void> {
        return this.httpService.put(`seace/${seaceDataId}`, { seaceData });
    }

}
