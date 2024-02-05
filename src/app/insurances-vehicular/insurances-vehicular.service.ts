import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { InsuranceVehicularModel } from './insurance-vehicular.model';
import { Params } from '@angular/router';
import { PaymentModel } from '../payments/payment.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancesVehicularService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getInsuranceVehicularById(insuranceVehicularId: string): Observable<InsuranceVehicularModel> {
        return this.httpService.get(`insurancesVehicular/byId/${insuranceVehicularId}`);
    }

    getInsurancesVehicularByPage(pageIndex: number, pageSize: number, params: Params): Observable<InsuranceVehicularModel[]> {
        return this.httpService.get(`insurancesVehicular/byPage/${pageIndex}/${pageSize}`, params);
    }

    getInsurancesByInsuranceGroup(insuranceGroupId: string): Observable<InsuranceVehicularModel[]> {
        return this.httpService.get(`insurances/byInsuranceGroup/${insuranceGroupId}`);
    }

    getInsurancesVehicularByKey(key: string): Observable<InsuranceVehicularModel[]> {
        return this.httpService.get(`insurances/byKey/${key}`);
    }

    getCountInsurancesVehicular(params: Params): Observable<number> {
        return this.httpService.get(`insurancesVehicular/countInsurancesVehicular`, params);
    }

    getInsurancesByRangeDate(startDate: Date, endDate: Date, params: Params): Observable<InsuranceVehicularModel[]> {
        return this.httpService.get(`insurances/byRangeDate/${startDate}/${endDate}`, params);
    }

    getInsurancesRenewByTypeWorker(params: Params): Observable<InsuranceVehicularModel[]> {
        return this.httpService.get(`insurances/renewByTypeWorker`, params);
    }

    // getPdfs(insuranceId: string, type: string): Observable<InsurancePdfModel[]> {
    //     return this.httpService.get(`insurances/pdfs/${insuranceId}/${type}`);
    // }

    uploadFile(formData: FormData, insuranceId: string, type: string): Observable<any> {
        return this.httpService.postForm(`insurances/uploadPdf/${insuranceId}/${type}`, formData);
    }

    create(insurance: any, insuranceGroupId: string): Observable<InsuranceVehicularModel> {
        return this.httpService.post(`insurancesVehicular/${insuranceGroupId}`, { insurance });
    }

    update(
        insuranceVehicular: any,
        payments: PaymentModel[],
        insuranceVehicularId: string
    ): Observable<void> {
        return this.httpService.put(`insurancesVehicular/${insuranceVehicularId}`, { insuranceVehicular, payments });
    }

    createWithInsuranceGroup(insuranceVehicular: any): Observable<InsuranceVehicularModel> {
        return this.httpService.post('insurancesVehicular/withInsuranceGroup', { insuranceVehicular });
    }

    updateOffice(insuranceId: string, officeId: string): Observable<void> {
        return this.httpService.put(`insurances/updateOffice/${insuranceId}`, { officeId });
    }

    updateStatus(insuranceId: string, status: string): Observable<void> {
        return this.httpService.get(`insurances/${insuranceId}/${status}`);
    }

    delete(insuranceVehicularId: string): Observable<void> {
        return this.httpService.delete(`insurancesVehicular/${insuranceVehicularId}`);
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
