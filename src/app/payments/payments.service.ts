import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { PaymentModel } from './payment.model';

@Injectable({
    providedIn: 'root'
})
export class PaymentsService {

    constructor(
        private readonly httpService: HttpService
    ) { }

    importPayments(payments: any[], bankId: string, companyId: string) {
        return this.httpService.post(`payments/importPayments/${bankId}/${companyId}`, { payments })
    }

    getPaymentsByPage(pageIndex: number, pageSize: number): Observable<PaymentModel[]> {
        return this.httpService.get(`payments/byPage/${pageIndex}/${pageSize}`)
    }

    getCountPayments(): Observable<number> {
        return this.httpService.get('payments/countPayments')
    }

}
