import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { CreatePaymentOrderModel } from './create-payment-order.model';
import { PaymentOrderModel } from './payment-order.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentOrdersService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getPaymentOrderById(paymentOrderId: string) {
    return this.httpService.get(`paymentOrders/byId/${paymentOrderId}`);
  }

  getPaymentOrders(): Observable<PaymentOrderModel[]> {
    return this.httpService.get('paymentOrders');
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

  updatePdf(formData: FormData, paymentOrderId: string): Observable<string> {
    return this.httpService.postForm(`paymentOrderPdfs/${paymentOrderId}`, formData);
  }

  deletePdf(pdfId: string) {
    return this.httpService.delete(`paymentOrderPdfs/${pdfId}`);
  }

}
