import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { CreatePaymentOrderModel } from './create-payment-order.model';
import { PaymentOrderPdfModel } from './payment-order-pdf.model';
import { PaymentOrderModel } from './payment-order.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentOrdersService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getCountPaymentOrders(): Observable<number> {
    return this.httpService.get('paymentOrders/count');
  }

  getCountPaymentOrdersByKey(key: string): Observable<number> {
    return this.httpService.get(`paymentOrders/countPaymentOrdersByKey/${key}`);
  }

  getCountPaymentOrdersByRangeDateCompany(
    params: Params
  ): Observable<number> {
    return this.httpService.get('paymentOrders/countPaymentOrdersByRangeDateCompany', { params });
  }

  getPaymentOrderById(paymentOrderId: string) {
    return this.httpService.get(`paymentOrders/byId/${paymentOrderId}`);
  }

  getPaymentOrders(): Observable<PaymentOrderModel[]> {
    return this.httpService.get('paymentOrders');
  }

  getPaymentOrdersByPage(pageIndex: number, pageSize: number): Observable<PaymentOrderModel[]> {
    return this.httpService.get(`paymentOrders/byPage/${pageIndex}/${pageSize}`);
  }

  getPaymentOrdersByPageKey(pageIndex: number, pageSize: number, key: string): Observable<PaymentOrderModel[]> {
    const params = { key };
    return this.httpService.get(`paymentOrders/byPageKey/${pageIndex}/${pageSize}`, { params });
  }

  getPaymentOrdersByRangeDateCompanyPage(
    pageIndex: number, 
    pageSize: number,
    params: Params
  ): Observable<PaymentOrderModel[]> {
    return this.httpService.get(`paymentOrders/byRangeDateCompanyPage/${pageIndex}/${pageSize}`, { params });
  }

  getPaymentOrdersByRangeDateCompany(
    params: Params
  ): Observable<PaymentOrderModel[]> {
    return this.httpService.get(`paymentOrders/byRangeDateCompany`, { params });
  }

  getSummaryByYear(year: number, params: Params): Observable<PaymentOrderModel[]> {
    return this.httpService.get(`paymentOrders/summaryByYear/${year}`, { params });
  }

  create(paymentOrder: CreatePaymentOrderModel): Observable<PaymentOrderModel> {
    return this.httpService.post('paymentOrders', { paymentOrder });
  }

  update(paymentOrder: PaymentOrderModel, paymentOrderId: string) {
    return this.httpService.put(`paymentOrders/${paymentOrderId}`, { paymentOrder });
  }

  delete(paymentOrderId: string): Observable<void> {
    return this.httpService.delete(`paymentOrders/${paymentOrderId}`);
  }

  getPdfs(paymentOrderId: string): Observable<PaymentOrderPdfModel[]> {
    return this.httpService.get(`paymentOrderPdfs/byPaymentOrderId/${paymentOrderId}`);
  }

  uploadFile(formData: FormData, paymentOrderId: string): Observable<string> {
    return this.httpService.postForm(`paymentOrderPdfs/${paymentOrderId}`, formData);
  }

  deletePdf(pdfId: string) {
    return this.httpService.delete(`paymentOrderPdfs/${pdfId}`);
  }

}
