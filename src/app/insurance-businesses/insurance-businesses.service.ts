import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { InsuranceBusinessModel } from './insurance-business.model';

@Injectable({
    providedIn: 'root'
})
export class InsuranceBusinessesService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getBusinessesByKey(key: string): Observable<InsuranceBusinessModel[]> {
        return this.httpService.get(`insuranceBusinesses/byKey/${key}`);
    }

    getBusinesses(): Observable<InsuranceBusinessModel[]> {
        return this.httpService.get('insuranceBusinesses');
    }

    getBusinessesByPage(pageIndex: number, pageSize: number): Observable<InsuranceBusinessModel[]> {
        return this.httpService.get(`insuranceBusinesses/${pageIndex}/${pageSize}`);
    }

    getBusinessesCount(): Observable<number> {
        return this.httpService.get('insuranceBusinesses/count');
    }

    getBusinessById(businessId: string): Observable<InsuranceBusinessModel> {
        return this.httpService.get(`insuranceBusinesses/${businessId}`);
    }

    create(business: any): Observable<InsuranceBusinessModel> {
        return this.httpService.post('insuranceBusinesses', { business });
    }

    update(business: any, businessId: string): Observable<void> {
        return this.httpService.put(`insuranceBusinesses/${businessId}`, { business });
    }

}
