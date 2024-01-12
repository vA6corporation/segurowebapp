import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { InsuranceRcivilModel } from './insurance-rcivil.model';
import { Params } from '@angular/router';
import { PaymentModel } from '../payments/payment.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancesRcivilService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getInsuranceRcivilById(insuranceRcivilId: string): Observable<InsuranceRcivilModel> {
        return this.httpService.get(`insurancesRcivil/byId/${insuranceRcivilId}`);
    }

    getInsurancesRcivilByPage(pageIndex: number, pageSize: number, params: Params): Observable<InsuranceRcivilModel[]> {
        return this.httpService.get(`insurancesRcivil/byPage/${pageIndex}/${pageSize}`, params);
    }

    getInsurancesByInsuranceGroup(insuranceGroupId: string): Observable<InsuranceRcivilModel[]> {
        return this.httpService.get(`insurances/byInsuranceGroup/${insuranceGroupId}`);
    }

    getInsurancesRcivilByKey(key: string): Observable<InsuranceRcivilModel[]> {
        return this.httpService.get(`insurances/byKey/${key}`);
    }

    getCountInsurancesRcivil(params: Params): Observable<number> {
        return this.httpService.get(`insurancesRcivil/countInsurancesRcivil`, params);
    }

    getInsurancesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<InsuranceRcivilModel[]> {
        return this.httpService.get(`insurances/byRangeDate/${startDate}/${endDate}`, params);
    }

    getInsurancesRenewByTypeWorker(params: Params): Observable<InsuranceRcivilModel[]> {
        return this.httpService.get(`insurances/renewByTypeWorker`, params);
    }

    // getPdfs(insuranceId: string, type: string): Observable<InsurancePdfModel[]> {
    //     return this.httpService.get(`insurances/pdfs/${insuranceId}/${type}`);
    // }

    uploadFile(formData: FormData, insuranceId: string, type: string): Observable<any> {
        return this.httpService.postForm(`insurances/uploadPdf/${insuranceId}/${type}`, formData);
    }

    create(insurance: any, insuranceGroupId: string): Observable<InsuranceRcivilModel> {
        return this.httpService.post(`insurancesRcivil/${insuranceGroupId}`, { insurance });
    }

    update(
        insuranceRcivil: any,
        payments: PaymentModel[],
        insuranceRcivilId: string
    ): Observable<void> {
        return this.httpService.put(`insurancesRcivil/${insuranceRcivilId}`, { insuranceRcivil, payments });
    }

    createWithInsuranceGroup(insuranceRcivil: any): Observable<InsuranceRcivilModel> {
        return this.httpService.post('insurancesRcivil/withInsuranceGroup', { insuranceRcivil });
    }

    updateOffice(insuranceId: string, officeId: string): Observable<void> {
        return this.httpService.put(`insurances/updateOffice/${insuranceId}`, { officeId });
    }

    updateStatus(insuranceId: string, status: string): Observable<void> {
        return this.httpService.get(`insurances/${insuranceId}/${status}`);
    }

    delete(insuranceRcivilId: string): Observable<void> {
        return this.httpService.delete(`insurancesRcivil/${insuranceRcivilId}`);
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
