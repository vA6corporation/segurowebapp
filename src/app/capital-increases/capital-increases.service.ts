import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { CapitalIncreaseModel } from './capital-increase.model';
import { PaymentModel } from '../payments/payment.model';
import { CapitalIncreasePdfModel } from './capital-increase-pdf.model';

@Injectable({
    providedIn: 'root'
})
export class CapitalIncreasesService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getPdfs(capitalIncreaseId: string, type: string): Observable<CapitalIncreasePdfModel[]> {
        return this.httpService.get(`capitalIncreasePdfs/${capitalIncreaseId}/${type}`)
    }

    deletePdf(pdfId: string): Observable<void> {
        return this.httpService.delete(`capitalIncreasePdfs/${pdfId}`);
    }

    uploadFile(formData: FormData, capitalIncreaseId: string, type: string): Observable<string> {
        return this.httpService.postForm(`capitalIncreasePdfs/${capitalIncreaseId}/${type}`, formData);
    }

    getCapitalIncreaseById(
        capitalIncreaseId: string
    ): Observable<CapitalIncreaseModel> {
        return this.httpService.get(`capitalIncreases/byId/${capitalIncreaseId}`);
    }

    getCountCapitalIncreases(): Observable<number> {
        return this.httpService.get('capitalIncreases/countCapitalIncreases');
    }

    getCapitalIncreasesByPage(
        pageIndex: number,
        pageSize: number,
    ): Observable<CapitalIncreaseModel[]> {
        return this.httpService.get(`capitalIncreases/byPage/${pageIndex}/${pageSize}`);
    }

    create(
        capitalIncrease: any,
    ): Observable<CapitalIncreaseModel> {
        return this.httpService.post('capitalIncreases', { capitalIncrease });
    }

    update(
        capitalIncrease: any,
        payments: PaymentModel[],
        capitalIncreaseId: string
    ): Observable<void> {
        return this.httpService.put(`capitalIncreases/${capitalIncreaseId}`, { capitalIncrease, payments });
    }

    delete(
        capitalIncreaseId: string
    ): Observable<void> {
        return this.httpService.delete(`capitalIncreases/${capitalIncreaseId}`)
    }

}
