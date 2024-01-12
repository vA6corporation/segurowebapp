import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { InsuranceMultirriesgosModel } from './insurance-multirriesgos.model';
import { Params } from '@angular/router';
import { PaymentModel } from '../payments/payment.model';

@Injectable({
    providedIn: 'root'
})
export class InsurancesMultirriesgosService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getInsuranceMultirriesgosById(insuranceMultirriesgosId: string): Observable<InsuranceMultirriesgosModel> {
        return this.httpService.get(`insurancesMultirriesgos/byId/${insuranceMultirriesgosId}`);
    }

    getInsurancesMultirriesgosByPage(pageIndex: number, pageSize: number, params: Params): Observable<InsuranceMultirriesgosModel[]> {
        return this.httpService.get(`insurancesMultirriesgos/byPage/${pageIndex}/${pageSize}`, params);
    }

    getInsurancesByInsuranceGroup(insuranceGroupId: string): Observable<InsuranceMultirriesgosModel[]> {
        return this.httpService.get(`insurances/byInsuranceGroup/${insuranceGroupId}`);
    }

    getInsurancesMultirriesgosByKey(key: string): Observable<InsuranceMultirriesgosModel[]> {
        return this.httpService.get(`insurances/byKey/${key}`);
    }

    getCountInsurancesMultirriesgos(params: Params): Observable<number> {
        return this.httpService.get(`insurancesMultirriesgos/countInsurancesMultirriesgos`, params);
    }

    getInsurancesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<InsuranceMultirriesgosModel[]> {
        return this.httpService.get(`insurances/byRangeDate/${startDate}/${endDate}`, params);
    }

    getInsurancesRenewByTypeWorker(params: Params): Observable<InsuranceMultirriesgosModel[]> {
        return this.httpService.get(`insurances/renewByTypeWorker`, params);
    }

    // getPdfs(insuranceId: string, type: string): Observable<InsurancePdfModel[]> {
    //     return this.httpService.get(`insurances/pdfs/${insuranceId}/${type}`);
    // }

    uploadFile(formData: FormData, insuranceId: string, type: string): Observable<any> {
        return this.httpService.postForm(`insurances/uploadPdf/${insuranceId}/${type}`, formData);
    }

    create(insurance: any, insuranceGroupId: string): Observable<InsuranceMultirriesgosModel> {
        return this.httpService.post(`insurancesMultirriesgos/${insuranceGroupId}`, { insurance });
    }

    update(
        insuranceMultirriesgos: any,
        payments: PaymentModel[],
        insuranceMultirriesgosId: string
    ): Observable<void> {
        return this.httpService.put(`insurancesMultirriesgos/${insuranceMultirriesgosId}`, { insuranceMultirriesgos, payments });
    }

    createWithInsuranceGroup(insuranceMultirriesgos: any): Observable<InsuranceMultirriesgosModel> {
        return this.httpService.post('insurancesMultirriesgos/withInsuranceGroup', { insuranceMultirriesgos });
    }

    updateOffice(insuranceId: string, officeId: string): Observable<void> {
        return this.httpService.put(`insurances/updateOffice/${insuranceId}`, { officeId });
    }

    updateStatus(insuranceId: string, status: string): Observable<void> {
        return this.httpService.get(`insurances/${insuranceId}/${status}`);
    }

    delete(insuranceMultirriesgosId: string): Observable<void> {
        return this.httpService.delete(`insurancesMultirriesgos/${insuranceMultirriesgosId}`);
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
