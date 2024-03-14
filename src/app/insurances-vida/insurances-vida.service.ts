import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { InsuranceVidaModel } from './insurance-vida.model';
import { Params } from '@angular/router';
import { PaymentModel } from '../payments/payment.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancesVidaService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getInsuranceVidaById(insuranceVidaId: string): Observable<InsuranceVidaModel> {
        return this.httpService.get(`insurancesVida/byId/${insuranceVidaId}`);
    }

    getInsurancesVidaByPage(pageIndex: number, pageSize: number, params: Params): Observable<InsuranceVidaModel[]> {
        return this.httpService.get(`insurancesVida/byPage/${pageIndex}/${pageSize}`, params);
    }

    getInsurancesByInsuranceGroup(insuranceGroupId: string): Observable<InsuranceVidaModel[]> {
        return this.httpService.get(`insurances/byInsuranceGroup/${insuranceGroupId}`);
    }

    getInsurancesVidaByKey(key: string): Observable<InsuranceVidaModel[]> {
        return this.httpService.get(`insurancesVida/byKey/${key}`);
    }

    getCountInsurancesVida(params: Params): Observable<number> {
        return this.httpService.get(`insurancesVida/countInsurancesVida`, params);
    }

    getInsurancesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<InsuranceVidaModel[]> {
        return this.httpService.get(`insurances/byRangeDate/${startDate}/${endDate}`, params);
    }

    getInsurancesRenewByTypeWorker(params: Params): Observable<InsuranceVidaModel[]> {
        return this.httpService.get(`insurances/renewByTypeWorker`, params);
    }

    // getPdfs(insuranceId: string, type: string): Observable<InsurancePdfModel[]> {
    //     return this.httpService.get(`insurances/pdfs/${insuranceId}/${type}`);
    // }

    uploadFile(formData: FormData, insuranceId: string, type: string): Observable<any> {
        return this.httpService.postForm(`insurances/uploadPdf/${insuranceId}/${type}`, formData);
    }

    create(insurance: any, insuranceGroupId: string): Observable<InsuranceVidaModel> {
        return this.httpService.post(`insurancesVida/${insuranceGroupId}`, { insurance });
    }

    update(
        insuranceVida: any,
        payments: PaymentModel[],
        insuranceVidaId: string
    ): Observable<void> {
        return this.httpService.put(`insurancesVida/${insuranceVidaId}`, { insuranceVida, payments });
    }

    createWithInsuranceGroup(insuranceVida: any): Observable<InsuranceVidaModel> {
        return this.httpService.post('insurancesVida/withInsuranceGroup', { insuranceVida });
    }

    updateOffice(insuranceId: string, officeId: string): Observable<void> {
        return this.httpService.put(`insurances/updateOffice/${insuranceId}`, { officeId });
    }

    updateStatus(insuranceId: string, status: string): Observable<void> {
        return this.httpService.get(`insurances/${insuranceId}/${status}`);
    }

    delete(insuranceVidaId: string): Observable<void> {
        return this.httpService.delete(`insurancesVida/${insuranceVidaId}`);
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
