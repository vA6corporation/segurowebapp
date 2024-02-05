import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { InsurancePolizacarModel } from './insurance-polizacar.model';
import { Params } from '@angular/router';
import { PaymentModel } from '../payments/payment.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancesPolizacarService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getInsurancePolizacarById(insurancePolizacarId: string): Observable<InsurancePolizacarModel> {
        return this.httpService.get(`insurancesPolizacar/byId/${insurancePolizacarId}`);
    }

    getInsurancesPolizacarByPage(pageIndex: number, pageSize: number, params: Params): Observable<InsurancePolizacarModel[]> {
        return this.httpService.get(`insurancesPolizacar/byPage/${pageIndex}/${pageSize}`, params);
    }

    getInsurancesByInsuranceGroup(insuranceGroupId: string): Observable<InsurancePolizacarModel[]> {
        return this.httpService.get(`insurances/byInsuranceGroup/${insuranceGroupId}`);
    }

    getInsurancesPolizacarByKey(key: string): Observable<InsurancePolizacarModel[]> {
        return this.httpService.get(`insurances/byKey/${key}`);
    }

    getCountInsurancesPolizacar(params: Params): Observable<number> {
        return this.httpService.get(`insurancesPolizacar/countInsurancesPolizacar`, params);
    }

    getInsurancesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<InsurancePolizacarModel[]> {
        return this.httpService.get(`insurances/byRangeDate/${startDate}/${endDate}`, params);
    }

    getInsurancesRenewByTypeWorker(params: Params): Observable<InsurancePolizacarModel[]> {
        return this.httpService.get(`insurances/renewByTypeWorker`, params);
    }

    // getPdfs(insuranceId: string, type: string): Observable<InsurancePdfModel[]> {
    //     return this.httpService.get(`insurances/pdfs/${insuranceId}/${type}`);
    // }

    uploadFile(formData: FormData, insuranceId: string, type: string): Observable<any> {
        return this.httpService.postForm(`insurances/uploadPdf/${insuranceId}/${type}`, formData);
    }

    create(insurance: any, insuranceGroupId: string): Observable<InsurancePolizacarModel> {
        return this.httpService.post(`insurancesPolizacar/${insuranceGroupId}`, { insurance });
    }

    update(
        insurancePolizacar: any,
        payments: PaymentModel[],
        insurancePolizacarId: string
    ): Observable<void> {
        return this.httpService.put(`insurancesPolizacar/${insurancePolizacarId}`, { insurancePolizacar, payments });
    }

    createWithInsuranceGroup(insurancePolizacar: any): Observable<InsurancePolizacarModel> {
        return this.httpService.post('insurancesPolizacar/withInsuranceGroup', { insurancePolizacar });
    }

    updateOffice(insuranceId: string, officeId: string): Observable<void> {
        return this.httpService.put(`insurances/updateOffice/${insuranceId}`, { officeId });
    }

    updateStatus(insuranceId: string, status: string): Observable<void> {
        return this.httpService.get(`insurances/${insuranceId}/${status}`);
    }

    delete(insurancePolizacarId: string): Observable<void> {
        return this.httpService.delete(`insurancesPolizacar/${insurancePolizacarId}`);
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
