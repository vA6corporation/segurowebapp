import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { InsuranceSctrModel } from './insurance-sctr.model';
import { Params } from '@angular/router';
import { PaymentModel } from '../payments/payment.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancesSctrService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getInsuranceSctrById(insuranceSctrId: string): Observable<InsuranceSctrModel> {
        return this.httpService.get(`insurancesSctr/byId/${insuranceSctrId}`);
    }

    getInsurancesSctrByPage(pageIndex: number, pageSize: number, params: Params): Observable<InsuranceSctrModel[]> {
        return this.httpService.get(`insurancesSctr/byPage/${pageIndex}/${pageSize}`, params);
    }

    getInsurancesByInsuranceGroup(insuranceGroupId: string): Observable<InsuranceSctrModel[]> {
        return this.httpService.get(`insurances/byInsuranceGroup/${insuranceGroupId}`);
    }

    getInsurancesSctrByKey(key: string): Observable<InsuranceSctrModel[]> {
        return this.httpService.get(`insurancesSctr/byKey/${key}`);
    }

    getCountInsurancesSctr(params: Params): Observable<number> {
        return this.httpService.get(`insurancesSctr/countInsurancesSctr`, params);
    }

    getInsurancesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<InsuranceSctrModel[]> {
        return this.httpService.get(`insurances/byRangeDate/${startDate}/${endDate}`, params);
    }

    getInsurancesRenewByTypeWorker(params: Params): Observable<InsuranceSctrModel[]> {
        return this.httpService.get(`insurances/renewByTypeWorker`, params);
    }

    // getPdfs(insuranceId: string, type: string): Observable<InsurancePdfModel[]> {
    //     return this.httpService.get(`insurances/pdfs/${insuranceId}/${type}`);
    // }

    uploadFile(formData: FormData, insuranceId: string, type: string): Observable<any> {
        return this.httpService.postForm(`insurances/uploadPdf/${insuranceId}/${type}`, formData);
    }

    create(insurance: any, insuranceGroupId: string): Observable<InsuranceSctrModel> {
        return this.httpService.post(`insurancesSctr/${insuranceGroupId}`, { insurance });
    }

    update(
        insuranceSctr: any,
        payments: PaymentModel[],
        insuranceSctrId: string
    ): Observable<void> {
        return this.httpService.put(`insurancesSctr/${insuranceSctrId}`, { insuranceSctr, payments });
    }

    createWithInsuranceGroup(insuranceSctr: any): Observable<InsuranceSctrModel> {
        return this.httpService.post('insurancesSctr/withInsuranceGroup', { insuranceSctr });
    }

    updateOffice(insuranceId: string, officeId: string): Observable<void> {
        return this.httpService.put(`insurances/updateOffice/${insuranceId}`, { officeId });
    }

    updateStatus(insuranceId: string, status: string): Observable<void> {
        return this.httpService.get(`insurances/${insuranceId}/${status}`);
    }

    delete(insuranceSctrId: string): Observable<void> {
        return this.httpService.delete(`insurancesSctr/${insuranceSctrId}`);
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
