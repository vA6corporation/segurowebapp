import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { InsuranceVidaleyModel } from './insurance-vidaley.model';
import { Params } from '@angular/router';
import { PaymentModel } from '../payments/payment.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancesVidaleyService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getInsuranceVidaleyById(insuranceVidaleyId: string): Observable<InsuranceVidaleyModel> {
        return this.httpService.get(`insurancesVidaley/byId/${insuranceVidaleyId}`);
    }

    getInsurancesVidaleyByPage(pageIndex: number, pageSize: number, params: Params): Observable<InsuranceVidaleyModel[]> {
        return this.httpService.get(`insurancesVidaley/byPage/${pageIndex}/${pageSize}`, params);
    }

    getInsurancesByInsuranceGroup(insuranceGroupId: string): Observable<InsuranceVidaleyModel[]> {
        return this.httpService.get(`insurances/byInsuranceGroup/${insuranceGroupId}`);
    }

    getInsurancesVidaleyByKey(key: string): Observable<InsuranceVidaleyModel[]> {
        return this.httpService.get(`insurancesVidaley/byKey/${key}`);
    }

    getCountInsurancesVidaley(params: Params): Observable<number> {
        return this.httpService.get(`insurancesVidaley/countInsurancesVidaley`, params);
    }

    getInsurancesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<InsuranceVidaleyModel[]> {
        return this.httpService.get(`insurances/byRangeDate/${startDate}/${endDate}`, params);
    }

    getInsurancesRenewByTypeWorker(params: Params): Observable<InsuranceVidaleyModel[]> {
        return this.httpService.get(`insurances/renewByTypeWorker`, params);
    }

    // getPdfs(insuranceId: string, type: string): Observable<InsurancePdfModel[]> {
    //     return this.httpService.get(`insurances/pdfs/${insuranceId}/${type}`);
    // }

    uploadFile(formData: FormData, insuranceId: string, type: string): Observable<any> {
        return this.httpService.postForm(`insurances/uploadPdf/${insuranceId}/${type}`, formData);
    }

    create(insurance: any, insuranceGroupId: string): Observable<InsuranceVidaleyModel> {
        return this.httpService.post(`insurancesVidaley/${insuranceGroupId}`, { insurance });
    }

    update(
        insuranceVidaley: any,
        payments: PaymentModel[],
        insuranceVidaleyId: string
    ): Observable<void> {
        return this.httpService.put(`insurancesVidaley/${insuranceVidaleyId}`, { insuranceVidaley, payments });
    }

    createWithInsuranceGroup(insuranceVidaley: any): Observable<InsuranceVidaleyModel> {
        return this.httpService.post('insurancesVidaley/withInsuranceGroup', { insuranceVidaley });
    }

    updateOffice(insuranceId: string, officeId: string): Observable<void> {
        return this.httpService.put(`insurances/updateOffice/${insuranceId}`, { officeId });
    }

    updateStatus(insuranceId: string, status: string): Observable<void> {
        return this.httpService.get(`insurances/${insuranceId}/${status}`);
    }

    delete(insuranceVidaleyId: string): Observable<void> {
        return this.httpService.delete(`insurancesVidaley/${insuranceVidaleyId}`);
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
