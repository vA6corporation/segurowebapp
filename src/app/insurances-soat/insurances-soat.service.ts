import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { InsuranceSoatModel } from './insurance-soat.model';
import { Params } from '@angular/router';
import { PaymentModel } from '../payments/payment.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancesSoatService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getInsuranceSoatById(insuranceId: string): Observable<InsuranceSoatModel> {
        return this.httpService.get(`insurancesSoat/byId/${insuranceId}`);
    }

    getInsurancesSoatByPage(pageIndex: number, pageSize: number,  params: Params): Observable<InsuranceSoatModel[]> {
        return this.httpService.get(`insurancesSoat/byPage/${pageIndex}/${pageSize}`, params);
    }

    getInsurancesByInsuranceGroup(insuranceGroupId: string): Observable<InsuranceSoatModel[]> {
        return this.httpService.get(`insurances/byInsuranceGroup/${insuranceGroupId}`);
    }

    getInsurancesSoatByKey(key: string): Observable<InsuranceSoatModel[]> {
        return this.httpService.get(`insurancesSoat/byKey/${key}`);
    }

    getCountInsurancesSoat( params: Params): Observable<number> {
        return this.httpService.get(`insurancesSoat/countInsurancesSoat`, params);
    }

    getInsurancesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<InsuranceSoatModel[]> {
        return this.httpService.get(`insurances/byRangeDate/${startDate}/${endDate}`, params);
    }

    getInsurancesRenewByTypeWorker(params: Params): Observable<InsuranceSoatModel[]> {
        return this.httpService.get(`insurances/renewByTypeWorker`, params);
    }

    // getPdfs(insuranceId: string, type: string): Observable<InsurancePdfModel[]> {
    //     return this.httpService.get(`insurances/pdfs/${insuranceId}/${type}`);
    // }

    uploadFile(formData: FormData, insuranceId: string, ): Observable<any> {
        return this.httpService.postForm(`insurances/uploadPdf/${insuranceId}`, formData);
    }

    create(insurance: any, insuranceGroupId: string): Observable<InsuranceSoatModel> {
        return this.httpService.post(`insurancesSoat/${insuranceGroupId}`, { insurance });
    }

    update(
        insuranceSoat: any,
        payments: PaymentModel[],
        insuranceId: string
    ): Observable<void> {
        return this.httpService.put(`insurancesSoat/${insuranceId}`, { insuranceSoat, payments });
    }

    createWithInsuranceGroup(insuranceSoat: any): Observable<InsuranceSoatModel> {
        return this.httpService.post('insurancesSoat/withInsuranceGroup', { insuranceSoat });
    }

    updateOffice(insuranceId: string, officeId: string): Observable<void> {
        return this.httpService.put(`insurances/updateOffice/${insuranceId}`, { officeId });
    }

    updateStatus(insuranceId: string, status: string): Observable<void> {
        return this.httpService.get(`insurances/${insuranceId}/${status}`);
    }

    delete(insuranceId: string): Observable<void> {
        return this.httpService.delete(`insurances/${insuranceId}`);
    }

    deletePdf(insurancesPdfId: string, pdfId: string): Observable<string> {
        return this.httpService.delete(`insurances/deletePdf/${insurancesPdfId}/${pdfId}`);
    }

    getSummary(year: number,  params: Params): Observable<any[]> {
        return this.httpService.get(`insurances/summaryByYearType/${year}`, params);
    }

    getSummaryByRangeDateTypeWorker(startDate: Date, endDate: Date, params: Params): Observable<any[]> {
        return this.httpService.get(`insurances/summaryByRangeDateTypeWorker/${startDate}/${endDate}`, params);
    }
}
