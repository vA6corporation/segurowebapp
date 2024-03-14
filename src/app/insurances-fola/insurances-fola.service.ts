import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { InsuranceFolaModel } from './insurance-fola.model';
import { Params } from '@angular/router';
import { PaymentModel } from '../payments/payment.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancesFolaService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getInsuranceFolaById(insuranceFolaId: string): Observable<InsuranceFolaModel> {
        return this.httpService.get(`insurancesFola/byId/${insuranceFolaId}`);
    }

    getInsurancesFolaByPage(pageIndex: number, pageSize: number, params: Params): Observable<InsuranceFolaModel[]> {
        return this.httpService.get(`insurancesFola/byPage/${pageIndex}/${pageSize}`, params);
    }

    getInsurancesByInsuranceGroup(insuranceGroupId: string): Observable<InsuranceFolaModel[]> {
        return this.httpService.get(`insurancesFola/byInsuranceGroup/${insuranceGroupId}`);
    }

    getInsurancesFolaByKey(key: string): Observable<InsuranceFolaModel[]> {
        return this.httpService.get(`insurancesFola/byKey/${key}`);
    }

    getCountInsurancesFola(params: Params): Observable<number> {
        return this.httpService.get(`insurancesFola/countInsurancesFola`, params);
    }

    getInsurancesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<InsuranceFolaModel[]> {
        return this.httpService.get(`insurances/byRangeDate/${startDate}/${endDate}`, params);
    }

    getInsurancesRenewByTypeWorker(params: Params): Observable<InsuranceFolaModel[]> {
        return this.httpService.get(`insurances/renewByTypeWorker`, params);
    }

    // getPdfs(insuranceId: string, type: string): Observable<InsurancePdfModel[]> {
    //     return this.httpService.get(`insurances/pdfs/${insuranceId}/${type}`);
    // }

    uploadFile(formData: FormData, insuranceId: string, type: string): Observable<any> {
        return this.httpService.postForm(`insurances/uploadPdf/${insuranceId}/${type}`, formData);
    }

    create(insurance: any, insuranceGroupId: string): Observable<InsuranceFolaModel> {
        return this.httpService.post(`insurancesFola/${insuranceGroupId}`, { insurance });
    }

    update(
        insuranceFola: any,
        payments: PaymentModel[],
        insuranceFolaId: string
    ): Observable<void> {
        return this.httpService.put(`insurancesFola/${insuranceFolaId}`, { insuranceFola, payments });
    }

    createWithInsuranceGroup(insuranceFola: any): Observable<InsuranceFolaModel> {
        return this.httpService.post('insurancesFola/withInsuranceGroup', { insuranceFola });
    }

    updateOffice(insuranceId: string, officeId: string): Observable<void> {
        return this.httpService.put(`insurances/updateOffice/${insuranceId}`, { officeId });
    }

    updateStatus(insuranceId: string, status: string): Observable<void> {
        return this.httpService.get(`insurances/${insuranceId}/${status}`);
    }

    delete(insuranceFolaId: string): Observable<void> {
        return this.httpService.delete(`insurancesFola/${insuranceFolaId}`);
    }

    deletePdf(insurancesPdfId: string, pdfId: string): Observable<string> {
        return this.httpService.delete(`insurances/deletePdf/${insurancesPdfId}/${pdfId}`);
    }

    getSummary(year: number, type: string, params: Params): Observable<any[]> {
        return this.httpService.get(`insurances/summaryByYearType/${year}/${type}`, params);
    }

    getSummaryByRangeDateTypeWorker(startDate: Date, endDate: Date, params: Params): Observable<any[]> {
        return this.httpService.get(`insurances/summaryByRangeDateTypeWorker/${startDate}/${endDate}`, params);
    }
}
