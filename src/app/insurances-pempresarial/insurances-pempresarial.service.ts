import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { InsurancePempresarialModel } from './insurance-pempresarial.model';
import { Params } from '@angular/router';
import { PaymentModel } from '../payments/payment.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancesPempresarialService {
    constructor(
        private readonly httpService: HttpService,
    ) { }

    getInsurancePempresarialById(insurancePempresarialId: string): Observable<InsurancePempresarialModel> {
        return this.httpService.get(`insurancesPempresarial/byId/${insurancePempresarialId}`);
    }

    getInsurancesPempresarialByPage(pageIndex: number, pageSize: number, params: Params): Observable<InsurancePempresarialModel[]> {
        return this.httpService.get(`insurancesPempresarial/byPage/${pageIndex}/${pageSize}`, params);
    }

    getInsurancesByInsuranceGroup(insuranceGroupId: string): Observable<InsurancePempresarialModel[]> {
        return this.httpService.get(`insurancesPempresarial/byInsuranceGroup/${insuranceGroupId}`);
    }

    getInsurancesPempresarialByKey(key: string): Observable<InsurancePempresarialModel[]> {
        return this.httpService.get(`insurancesPempresarial/byKey/${key}`);
    }

    getCountInsurancesPempresarial(params: Params): Observable<number> {
        return this.httpService.get(`insurancesPempresarial/countInsurancesPempresarial`, params);
    }

    getInsurancesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<InsurancePempresarialModel[]> {
        return this.httpService.get(`insurances/byRangeDate/${startDate}/${endDate}`, params);
    }

    getInsurancesRenewByTypeWorker(params: Params): Observable<InsurancePempresarialModel[]> {
        return this.httpService.get(`insurances/renewByTypeWorker`, params);
    }

    // getPdfs(insuranceId: string, type: string): Observable<InsurancePdfModel[]> {
    //     return this.httpService.get(`insurances/pdfs/${insuranceId}/${type}`);
    // }

    uploadFile(formData: FormData, insuranceId: string, type: string): Observable<any> {
        return this.httpService.postForm(`insurances/uploadPdf/${insuranceId}/${type}`, formData);
    }

    create(insurance: any, insuranceGroupId: string): Observable<InsurancePempresarialModel> {
        return this.httpService.post(`insurancesPempresarial/${insuranceGroupId}`, { insurance });
    }

    update(
        insurancePempresarial: any,
        payments: PaymentModel[],
        insurancePempresarialId: string
    ): Observable<void> {
        return this.httpService.put(`insurancesPempresarial/${insurancePempresarialId}`, { insurancePempresarial, payments });
    }

    createWithInsuranceGroup(insurancePempresarial: any): Observable<InsurancePempresarialModel> {
        return this.httpService.post('insurancesPempresarial/withInsuranceGroup', { insurancePempresarial });
    }

    updateOffice(insuranceId: string, officeId: string): Observable<void> {
        return this.httpService.put(`insurances/updateOffice/${insuranceId}`, { officeId });
    }

    updateStatus(insuranceId: string, status: string): Observable<void> {
        return this.httpService.get(`insurances/${insuranceId}/${status}`);
    }

    delete(insurancePempresarialId: string): Observable<void> {
        return this.httpService.delete(`insurancesPempresarial/${insurancePempresarialId}`);
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
