import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { InsurancePolizaearModel } from './insurance-polizaear.model';
import { Params } from '@angular/router';
import { PaymentModel } from '../payments/payment.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancesPolizaearService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getInsurancePolizaearById(insurancePolizaearId: string): Observable<InsurancePolizaearModel> {
        return this.httpService.get(`insurancesPolizaear/byId/${insurancePolizaearId}`);
    }

    getInsurancesPolizaearByPage(pageIndex: number, pageSize: number, params: Params): Observable<InsurancePolizaearModel[]> {
        return this.httpService.get(`insurancesPolizaear/byPage/${pageIndex}/${pageSize}`, params);
    }

    getInsurancesByInsuranceGroup(insuranceGroupId: string): Observable<InsurancePolizaearModel[]> {
        return this.httpService.get(`insurances/byInsuranceGroup/${insuranceGroupId}`);
    }

    getInsurancesPolizaearByKey(key: string): Observable<InsurancePolizaearModel[]> {
        return this.httpService.get(`insurances/byKey/${key}`);
    }

    getCountInsurancesPolizaear(params: Params): Observable<number> {
        return this.httpService.get(`insurancesPolizaear/countInsurancesPolizaear`, params);
    }

    getInsurancesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<InsurancePolizaearModel[]> {
        return this.httpService.get(`insurances/byRangeDate/${startDate}/${endDate}`, params);
    }

    getInsurancesRenewByTypeWorker(params: Params): Observable<InsurancePolizaearModel[]> {
        return this.httpService.get(`insurances/renewByTypeWorker`, params);
    }

    // getPdfs(insuranceId: string, type: string): Observable<InsurancePdfModel[]> {
    //     return this.httpService.get(`insurances/pdfs/${insuranceId}/${type}`);
    // }

    uploadFile(formData: FormData, insuranceId: string, type: string): Observable<any> {
        return this.httpService.postForm(`insurances/uploadPdf/${insuranceId}/${type}`, formData);
    }

    create(insurance: any, insuranceGroupId: string): Observable<InsurancePolizaearModel> {
        return this.httpService.post(`insurancesPolizaear/${insuranceGroupId}`, { insurance });
    }

    update(
        insurancePolizaear: any,
        payments: PaymentModel[],
        insurancePolizaearId: string
    ): Observable<void> {
        return this.httpService.put(`insurancesPolizaear/${insurancePolizaearId}`, { insurancePolizaear, payments });
    }

    createWithInsuranceGroup(insurancePolizaear: any): Observable<InsurancePolizaearModel> {
        return this.httpService.post('insurancesPolizaear/withInsuranceGroup', { insurancePolizaear });
    }

    updateOffice(insuranceId: string, officeId: string): Observable<void> {
        return this.httpService.put(`insurances/updateOffice/${insuranceId}`, { officeId });
    }

    updateStatus(insuranceId: string, status: string): Observable<void> {
        return this.httpService.get(`insurances/${insuranceId}/${status}`);
    }

    delete(insurancePolizaearId: string): Observable<void> {
        return this.httpService.delete(`insurancesPolizaear/${insurancePolizaearId}`);
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
