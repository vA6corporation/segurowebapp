import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { InsuranceAccidentesModel } from './insurance-accidentes.model';
import { PaymentModel } from '../payments/payment.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancesAccidentesService {
    constructor(
        private readonly httpService: HttpService,
    ) { }

    getInsuranceAccidentesById(insuranceAccidentesId: string): Observable<InsuranceAccidentesModel> {
        return this.httpService.get(`insurancesAccidentes/byId/${insuranceAccidentesId}`);
    }

    getInsurancesAccidentesByPage(pageIndex: number, pageSize: number, params: Params): Observable<InsuranceAccidentesModel[]> {
        return this.httpService.get(`insurancesAccidentes/byPage/${pageIndex}/${pageSize}`, params);
    }

    getInsurancesByInsuranceGroup(insuranceGroupId: string): Observable<InsuranceAccidentesModel[]> {
        return this.httpService.get(`insurances/byInsuranceGroup/${insuranceGroupId}`);
    }

    getInsurancesAccidentesByKey(key: string): Observable<InsuranceAccidentesModel[]> {
        return this.httpService.get(`insurances/byKey/${key}`);
    }

    getCountInsurancesAccidentes(params: Params): Observable<number> {
        return this.httpService.get(`insurancesAccidentes/countInsurancesAccidentes`, params);
    }

    getInsurancesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<InsuranceAccidentesModel[]> {
        return this.httpService.get(`insurances/byRangeDate/${startDate}/${endDate}`, params);
    }

    getInsurancesRenewByTypeWorker(params: Params): Observable<InsuranceAccidentesModel[]> {
        return this.httpService.get(`insurances/renewByTypeWorker`, params);
    }

    // getPdfs(insuranceId: string, type: string): Observable<InsurancePdfModel[]> {
    //     return this.httpService.get(`insurances/pdfs/${insuranceId}/${type}`);
    // }

    uploadFile(formData: FormData, insuranceId: string, type: string): Observable<any> {
        return this.httpService.postForm(`insurances/uploadPdf/${insuranceId}/${type}`, formData);
    }

    create(insurance: any, insuranceGroupId: string): Observable<InsuranceAccidentesModel> {
        return this.httpService.post(`insurancesAccidentes/${insuranceGroupId}`, { insurance });
    }

    update(
        insuranceAccidentes: any,
        payments: PaymentModel[],
        insuranceAccidentesId: string
    ): Observable<void> {
        return this.httpService.put(`insurancesAccidentes/${insuranceAccidentesId}`, { insuranceAccidentes, payments });
    }

    createWithInsuranceGroup(insuranceAccidentes: any): Observable<InsuranceAccidentesModel> {
        return this.httpService.post('insurancesAccidentes/withInsuranceGroup', { insuranceAccidentes });
    }

    updateOffice(insuranceId: string, officeId: string): Observable<void> {
        return this.httpService.put(`insurances/updateOffice/${insuranceId}`, { officeId });
    }

    updateStatus(insuranceId: string, status: string): Observable<void> {
        return this.httpService.get(`insurances/${insuranceId}/${status}`);
    }

    delete(insuranceAccidentesId: string): Observable<void> {
        return this.httpService.delete(`insurancesAccidentes/${insuranceAccidentesId}`);
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
