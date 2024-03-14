import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { InsurancePolizatrecModel } from './insurance-polizatrec.model';
import { Params } from '@angular/router';
import { PaymentModel } from '../payments/payment.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancesPolizatrecService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getInsurancePolizatrecById(insurancePolizatrecId: string): Observable<InsurancePolizatrecModel> {
        return this.httpService.get(`insurancesPolizatrec/byId/${insurancePolizatrecId}`);
    }

    getInsurancesPolizatrecByPage(pageIndex: number, pageSize: number, params: Params): Observable<InsurancePolizatrecModel[]> {
        return this.httpService.get(`insurancesPolizatrec/byPage/${pageIndex}/${pageSize}`, params);
    }

    getInsurancesByInsuranceGroup(insuranceGroupId: string): Observable<InsurancePolizatrecModel[]> {
        return this.httpService.get(`insurances/byInsuranceGroup/${insuranceGroupId}`);
    }

    getInsurancesPolizatrecByKey(key: string): Observable<InsurancePolizatrecModel[]> {
        return this.httpService.get(`insurancesPolizatrec/byKey/${key}`);
    }

    getCountInsurancesPolizatrec(params: Params): Observable<number> {
        return this.httpService.get(`insurancesPolizatrec/countInsurancesPolizatrec`, params);
    }

    getInsurancesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<InsurancePolizatrecModel[]> {
        return this.httpService.get(`insurances/byRangeDate/${startDate}/${endDate}`, params);
    }

    getInsurancesRenewByTypeWorker(params: Params): Observable<InsurancePolizatrecModel[]> {
        return this.httpService.get(`insurances/renewByTypeWorker`, params);
    }

    // getPdfs(insuranceId: string, type: string): Observable<InsurancePdfModel[]> {
    //     return this.httpService.get(`insurances/pdfs/${insuranceId}/${type}`);
    // }

    uploadFile(formData: FormData, insuranceId: string, type: string): Observable<any> {
        return this.httpService.postForm(`insurances/uploadPdf/${insuranceId}/${type}`, formData);
    }

    create(insurance: any, insuranceGroupId: string): Observable<InsurancePolizatrecModel> {
        return this.httpService.post(`insurancesPolizatrec/${insuranceGroupId}`, { insurance });
    }

    update(
        insurancePolizatrec: any,
        payments: PaymentModel[],
        insurancePolizatrecId: string
    ): Observable<void> {
        return this.httpService.put(`insurancesPolizatrec/${insurancePolizatrecId}`, { insurancePolizatrec, payments });
    }

    createWithInsuranceGroup(insurancePolizatrec: any): Observable<InsurancePolizatrecModel> {
        return this.httpService.post('insurancesPolizatrec/withInsuranceGroup', { insurancePolizatrec });
    }

    updateOffice(insuranceId: string, officeId: string): Observable<void> {
        return this.httpService.put(`insurances/updateOffice/${insuranceId}`, { officeId });
    }

    updateStatus(insuranceId: string, status: string): Observable<void> {
        return this.httpService.get(`insurances/${insuranceId}/${status}`);
    }

    delete(insurancePolizatrecId: string): Observable<void> {
        return this.httpService.delete(`insurancesPolizatrec/${insurancePolizatrecId}`);
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
