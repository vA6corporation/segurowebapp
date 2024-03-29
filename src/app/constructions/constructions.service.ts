import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { PaymentModel } from '../payments/payment.model';
import { ConstructionPdfModel } from './construction-pdf.model';
import { ConstructionModel } from './construction.model';
import { GuaranteeModel } from '../guaranties/guarantee.model';

@Injectable({
    providedIn: 'root'
})
export class ConstructionsService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getEmitions(): Observable<GuaranteeModel[]> {
        return this.httpService.get('constructions/emitions');
    }

    getPdfs(type: string, constructionId: string): Observable<ConstructionPdfModel[]> {
        return this.httpService.get(`constructions/pdfs/byConstructionId/${type}/${constructionId}`);
    }

    getConstructions(params: Params): Observable<ConstructionModel[]> {
        return this.httpService.get('constructions', params);
    }

    getPaymentsByConstruction(constructionId: string): Observable<PaymentModel[]> {
        return this.httpService.get(`constructions/paymentsByConstruction/${constructionId}`);
    }

    getSummaryConstructions(params: Params): Observable<any[]> {
        return this.httpService.get('constructions/summaryByConstructionCode', params);
    }

    getUpdatePercentCompletions(): Observable<ConstructionModel[]> {
        return this.httpService.get('constructions/updatePercentCompletions');
    }

    getConstructionsByPercentCompletion(percentCompletionCode: string): Observable<ConstructionModel[]> {
        return this.httpService.get(`constructions/byPercentCompletionCode/${percentCompletionCode}`);
    }

    getConstructionsByOffice(): Observable<ConstructionModel[]> {
        return this.httpService.get('constructions/byOffice');
    }

    getSummaryCompletions(constructionCode: string, percentCompletionCode: string): Observable<any> {
        const params = { constructionCode, percentCompletionCode };
        return this.httpService.get(`constructions/summaryCompletions`, params);
    }

    //   getConstructions(params: Params): Observable<any> {
    //     return this.httpService.get(`constructions/debtorConstructions`, params);
    //   }

    getCountDebtorConstructions(params: Params) {
        return this.httpService.get(`constructions/countDebtorConstructions`, params);
    }

    getConstructionsByBusiness(businessId: string): Observable<ConstructionModel[]> {
        return this.httpService.get(`constructions/byBusiness/${businessId}`);
    }

    getConstructionsByRangeDateFinancierWorkerStatusWithGuaranteis(params: Params): Observable<ConstructionModel[]> {
        return this.httpService.get('constructions/byRangeDateFinancierWorkerStatusOfficeWithGuaranties', params);
    }

    getConstructionsByRangeDateFinancierWorkerStatus(params: Params): Observable<ConstructionModel[]> {
        return this.httpService.get('constructions/byRangeDateFinancierWorkerStatusOffice', params);
    }

    deletePdf(constructionPdfId: string, pdfId: string): Observable<string> {
        return this.httpService.delete(`constructions/deletePdf/${constructionPdfId}/${pdfId}`);
    }

    uploadPdf(
        formData: FormData,
        type: string,
        constructionId: string
    ): Observable<string> {
        return this.httpService.postForm(`constructions/uploadPdf/${type}/${constructionId}`, formData);
    }

    getConstructionsWithoutDocumentation(params: Params): Observable<ConstructionModel[]> {
        return this.httpService.get('constructions/withoutDocumentation', params);
    }

    getConstructionsWithoutDocumentationByKey(key: string): Observable<ConstructionModel[]> {
        return this.httpService.get(`constructions/withoutDocumentationByKey/${key}`);
    }

    getCountConstructionsWithoutDocumentation(): Observable<number> {
        return this.httpService.get('constructions/countWithoutDocumentation');
    }

    getCountConstructions(params: Params): Observable<number> {
        return this.httpService.get(`constructions/countConstructions`, params);
    }

    getCountConstructionsByKey(params: Params, key: string): Observable<number> {
        return this.httpService.get(`constructions/countConstructionsByKey/${key}`, params);
    }

    getConstructionById(constructionId: string): Observable<ConstructionModel> {
        return this.httpService.get(`constructions/byId/${constructionId}`);
    }

    getGuarantiesByConstructionId(constructionId: string): Observable<GuaranteeModel[]> {
        return this.httpService.get(`reports/byConstructionId/${constructionId}`);
    }

    getConstructionsByPageKey(
        pageIndex: number,
        pageSize: number,
        key: string,
        params: Params
    ): Observable<ConstructionModel[]> {
        return this.httpService.get(`constructions/byPageKey/${pageIndex}/${pageSize}/${key}`, params);
    }

    getConstructionsByPage(
        pageIndex: number,
        pageSize: number,
        params: Params
    ): Observable<ConstructionModel[]> {
        return this.httpService.get(`constructions/byPage/${pageIndex}/${pageSize}`, params);
    }

    create(construction: any, percentCompletions: any[], payments: any[]): Observable<any> {
        return this.httpService.post('constructions', { construction, percentCompletions, payments });
    }

    update(construction: any, percentCompletions: any[], payments: any[], constructionId: string): Observable<void> {
        return this.httpService.put(`constructions/${constructionId}`, { construction, percentCompletions, payments });
    }

    updateOffice(constructionId: string, construction: any): Observable<void> {
        return this.httpService.put(`constructions/updateOffice/${constructionId}`, { construction });
    }

    delete(constructionId: string): Observable<void> {
        return this.httpService.delete(`constructions/${constructionId}`);
    }

}
