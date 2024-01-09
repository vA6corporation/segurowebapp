import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { FinancierModel } from '../financiers/financier.model';
import { HttpService } from '../http.service';
import { PaymentModel } from '../payments/payment.model';
import { InsurancePdfModel } from './insurance-pdf.model';
import { InsuranceModel } from './insurance.model';

@Injectable({
    providedIn: 'root'
})
export class InsurancesService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getInsuranceById(insuranceId: string): Observable<InsuranceModel> {
        return this.httpService.get(`insurances/byId/${insuranceId}`);
    }

    getInsurancesByPageType(pageIndex: number, pageSize: number, type: string, params: Params): Observable<InsuranceModel[]> {
        return this.httpService.get(`insurances/byPageType/${pageIndex}/${pageSize}/${type}`, params);
    }

    getInsurancesByInsuranceGroup(insuranceGroupId: string): Observable<InsuranceModel[]> {
        return this.httpService.get(`insurances/byInsuranceGroup/${insuranceGroupId}`);
    }

    getInsurancesByKeyType(key: string, type: string): Observable<InsuranceModel[]> {
        return this.httpService.get(`insurances/byKeyType/${key}/${type}`);
    }

    getCountInsurancesByType(type: string, params: Params): Observable<number> {
        return this.httpService.get(`insurances/countInsurancesByType/${type}`, params);
    }

    getInsurancesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<InsuranceModel[]> {
        return this.httpService.get(`insurances/byRangeDate/${startDate}/${endDate}`, params);
    }

    getInsurancesRenewByTypeWorker(params: Params): Observable<InsuranceModel[]> {
        return this.httpService.get(`insurances/renewByTypeWorker`, params);
    }

    getPdfs(insuranceId: string, type: string): Observable<InsurancePdfModel[]> {
        return this.httpService.get(`insurances/pdfs/${insuranceId}/${type}`);
    }

    uploadFile(formData: FormData, insuranceId: string, type: string): Observable<any> {
        return this.httpService.postForm(`insurances/uploadPdf/${insuranceId}/${type}`, formData);
    }

    create(insurance: any, financier: FinancierModel, insuranceGroupId: string): Observable<InsuranceModel> {
        return this.httpService.post(`insurances/${insuranceGroupId}`, { insurance, financier });
    }

    update(
        insurance: any,
        payments: PaymentModel[],
        insuranceId: string
    ): Observable<void> {
        return this.httpService.put(`insurances/${insuranceId}`, { insurance, payments });
    }

    createWithInsuranceGroup(insurance: any): Observable<InsuranceModel> {
        return this.httpService.post('insurances', { insurance });
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

    getSummary(year: number, type: string, params: Params): Observable<any[]> {
        return this.httpService.get(`insurances/summaryByYearType/${year}/${type}`, params);
    }

    getSummaryByRangeDateTypeWorker(startDate: Date, endDate: Date, params: Params): Observable<any[]> {
        return this.httpService.get(`insurances/summaryByRangeDateTypeWorker/${startDate}/${endDate}`, params);
    }

}
