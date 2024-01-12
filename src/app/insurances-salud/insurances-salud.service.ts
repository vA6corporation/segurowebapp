import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { InsuranceSaludModel } from './insurance-salud.model';
import { PaymentModel } from '../payments/payment.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancesSaludService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getInsuranceSaludById(insuranceSaludId: string): Observable<InsuranceSaludModel> {
        return this.httpService.get(`insurancesSalud/byId/${insuranceSaludId}`);
    }

    getInsurancesSaludByPage(pageIndex: number, pageSize: number, params: Params): Observable<InsuranceSaludModel[]> {
        return this.httpService.get(`insurancesSalud/byPage/${pageIndex}/${pageSize}`, params);
    }

    getInsurancesByInsuranceGroup(insuranceGroupId: string): Observable<InsuranceSaludModel[]> {
        return this.httpService.get(`insurances/byInsuranceGroup/${insuranceGroupId}`);
    }

    getInsurancesSaludByKey(key: string): Observable<InsuranceSaludModel[]> {
        return this.httpService.get(`insurances/byKey/${key}`);
    }

    getCountInsurancesSalud(params: Params): Observable<number> {
        return this.httpService.get(`insurancesSalud/countInsurancesSalud`, params);
    }

    getInsurancesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<InsuranceSaludModel[]> {
        return this.httpService.get(`insurances/byRangeDate/${startDate}/${endDate}`, params);
    }

    getInsurancesRenewByTypeWorker(params: Params): Observable<InsuranceSaludModel[]> {
        return this.httpService.get(`insurances/renewByTypeWorker`, params);
    }

    // getPdfs(insuranceId: string, type: string): Observable<InsurancePdfModel[]> {
    //     return this.httpService.get(`insurances/pdfs/${insuranceId}/${type}`);
    // }

    uploadFile(formData: FormData, insuranceId: string, type: string): Observable<any> {
        return this.httpService.postForm(`insurances/uploadPdf/${insuranceId}/${type}`, formData);
    }

    create(insurance: any, insuranceGroupId: string): Observable<InsuranceSaludModel> {
        return this.httpService.post(`insurancesSalud/${insuranceGroupId}`, { insurance });
    }

    update(
        insuranceSalud: any,
        payments: PaymentModel[],
        insuranceSaludId: string
    ): Observable<void> {
        return this.httpService.put(`insurancesSalud/${insuranceSaludId}`, { insuranceSalud, payments });
    }

    createWithInsuranceGroup(insuranceSalud: any): Observable<InsuranceSaludModel> {
        return this.httpService.post('insurancesSalud/withInsuranceGroup', { insuranceSalud });
    }

    updateOffice(insuranceId: string, officeId: string): Observable<void> {
        return this.httpService.put(`insurances/updateOffice/${insuranceId}`, { officeId });
    }

    updateStatus(insuranceId: string, status: string): Observable<void> {
        return this.httpService.get(`insurances/${insuranceId}/${status}`);
    }

    delete(insuranceSaludId: string): Observable<void> {
        return this.httpService.delete(`insurancesSalud/${insuranceSaludId}`);
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
