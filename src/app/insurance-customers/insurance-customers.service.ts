import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from '../customers/customer.model';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceCustomersService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getCustomersByAny(key: string): Observable<CustomerModel[]> {
    return this.httpService.get(`insuranceCustomers/byAny/${key}`);
  }

  getCustomers(): Observable<CustomerModel[]> {
    return this.httpService.get('insuranceCustomers');
  }

  getCustomersByPage(pageIndex: number, pageSize: number): Observable<CustomerModel[]> {
    return this.httpService.get(`insuranceCustomers/${pageIndex}/${pageSize}`);
  }

  getCustomersCount(): Observable<number> {
    return this.httpService.get('insuranceCustomers/count');
  }

  getCustomerById(customerId: string): Observable<CustomerModel> {
    return this.httpService.get(`insuranceCustomers/${customerId}`);
  }

  create(customer: CustomerModel): Observable<CustomerModel> {
    return this.httpService.post('insuranceCustomers', { customer });
  }

  update(customer: CustomerModel, customerId: string): Observable<CustomerModel> {
    return this.httpService.put(`insuranceCustomers/${customerId}`, { customer });
  }
  
}
