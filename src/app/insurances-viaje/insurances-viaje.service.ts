import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { PaymentModel } from '../payments/payment.model';
import { InsuranceViajeModel } from './insurance-viaje.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancesViajeService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getInsuranceViajeById(insuranceViajeId: string): Observable<InsuranceViajeModel> {
        return this.httpService.get(`insurancesViaje/byId/${insuranceViajeId}`);
    }

    getInsurancesViajeByPage(pageIndex: number, pageSize: number, params: Params): Observable<InsuranceViajeModel[]> {
        return this.httpService.get(`insurancesViaje/byPage/${pageIndex}/${pageSize}`, params);
    }

    getInsurancesByInsuranceGroup(insuranceGroupId: string): Observable<InsuranceViajeModel[]> {
        return this.httpService.get(`insurances/byInsuranceGroup/${insuranceGroupId}`);
    }

    getInsurancesViajeByKey(key: string): Observable<InsuranceViajeModel[]> {
        return this.httpService.get(`insurances/byKey/${key}`);
    }

    getCountInsurancesViaje(params: Params): Observable<number> {
        return this.httpService.get(`insurancesViaje/countInsurancesViaje`, params);
    }

    getInsurancesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<InsuranceViajeModel[]> {
        return this.httpService.get(`insurances/byRangeDate/${startDate}/${endDate}`, params);
    }

    getInsurancesRenewByTypeWorker(params: Params): Observable<InsuranceViajeModel[]> {
        return this.httpService.get(`insurances/renewByTypeWorker`, params);
    }

    // getPdfs(insuranceId: string, type: string): Observable<InsurancePdfModel[]> {
    //     return this.httpService.get(`insurances/pdfs/${insuranceId}/${type}`);
    // }

    uploadFile(formData: FormData, insuranceId: string, type: string): Observable<any> {
        return this.httpService.postForm(`insurances/uploadPdf/${insuranceId}/${type}`, formData);
    }

    create(insurance: any, insuranceGroupId: string): Observable<InsuranceViajeModel> {
        return this.httpService.post(`insurancesViaje/${insuranceGroupId}`, { insurance });
    }

    update(
        insuranceViaje: any,
        payments: PaymentModel[],
        insuranceViajeId: string
    ): Observable<void> {
        return this.httpService.put(`insurancesViaje/${insuranceViajeId}`, { insuranceViaje, payments });
    }

    createWithInsuranceGroup(insuranceViaje: any): Observable<InsuranceViajeModel> {
        return this.httpService.post('insurancesViaje/withInsuranceGroup', { insuranceViaje });
    }

    updateOffice(insuranceId: string, officeId: string): Observable<void> {
        return this.httpService.put(`insurances/updateOffice/${insuranceId}`, { officeId });
    }

    updateStatus(insuranceId: string, status: string): Observable<void> {
        return this.httpService.get(`insurances/${insuranceId}/${status}`);
    }

    delete(insuranceViajeId: string): Observable<void> {
        return this.httpService.delete(`insurancesViaje/${insuranceViajeId}`);
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
