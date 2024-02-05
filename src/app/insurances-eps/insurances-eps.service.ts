import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { InsuranceEpsModel } from './insurance-eps.model';
import { Params } from '@angular/router';
import { PaymentModel } from '../payments/payment.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancesEpsService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getInsuranceEpsById(insuranceEpsId: string): Observable<InsuranceEpsModel> {
        return this.httpService.get(`insurancesEps/byId/${insuranceEpsId}`);
    }

    getInsurancesEpsByPage(pageIndex: number, pageSize: number, params: Params): Observable<InsuranceEpsModel[]> {
        return this.httpService.get(`insurancesEps/byPage/${pageIndex}/${pageSize}`, params);
    }

    getInsurancesByInsuranceGroup(insuranceGroupId: string): Observable<InsuranceEpsModel[]> {
        return this.httpService.get(`insurances/byInsuranceGroup/${insuranceGroupId}`);
    }

    getInsurancesEpsByKey(key: string): Observable<InsuranceEpsModel[]> {
        return this.httpService.get(`insurances/byKey/${key}`);
    }

    getCountInsurancesEps(params: Params): Observable<number> {
        return this.httpService.get(`insurancesEps/countInsurancesEps`, params);
    }

    getInsurancesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<InsuranceEpsModel[]> {
        return this.httpService.get(`insurances/byRangeDate/${startDate}/${endDate}`, params);
    }

    getInsurancesRenewByTypeWorker(params: Params): Observable<InsuranceEpsModel[]> {
        return this.httpService.get(`insurances/renewByTypeWorker`, params);
    }

    // getPdfs(insuranceId: string, type: string): Observable<InsurancePdfModel[]> {
    //     return this.httpService.get(`insurances/pdfs/${insuranceId}/${type}`);
    // }

    uploadFile(formData: FormData, insuranceId: string, type: string): Observable<any> {
        return this.httpService.postForm(`insurances/uploadPdf/${insuranceId}/${type}`, formData);
    }

    create(insurance: any, insuranceGroupId: string): Observable<InsuranceEpsModel> {
        return this.httpService.post(`insurancesEps/${insuranceGroupId}`, { insurance });
    }

    update(
        insuranceEps: any,
        payments: PaymentModel[],
        insuranceEpsId: string
    ): Observable<void> {
        return this.httpService.put(`insurancesEps/${insuranceEpsId}`, { insuranceEps, payments });
    }

    createWithInsuranceGroup(insuranceEps: any): Observable<InsuranceEpsModel> {
        return this.httpService.post('insurancesEps/withInsuranceGroup', { insuranceEps });
    }

    updateOffice(insuranceId: string, officeId: string): Observable<void> {
        return this.httpService.put(`insurances/updateOffice/${insuranceId}`, { officeId });
    }

    updateStatus(insuranceId: string, status: string): Observable<void> {
        return this.httpService.get(`insurances/${insuranceId}/${status}`);
    }

    delete(insuranceEpsId: string): Observable<void> {
        return this.httpService.delete(`insurancesEps/${insuranceEpsId}`);
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
