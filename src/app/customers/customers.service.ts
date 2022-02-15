import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpService } from '../http.service';
import { Customer } from './customer.model'

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  
  constructor(
    private readonly httpService: HttpService,
  ) { }

  getCustomersByAny(key: string): Observable<Customer[]> {
    return this.httpService.get(`customers/byAny/${key}`);
  }

  getCustomers(): Observable<Customer[]> {
    return this.httpService.get('customers');
  }

  getCustomersByPage(pageIndex: number, pageSize: number): Observable<Customer[]> {
    return this.httpService.get(`customers/${pageIndex}/${pageSize}`);
  }

  getCustomersCount(): Observable<number> {
    return this.httpService.get('customers/count');
  }

  getCustomerById(customerId: string): Observable<Customer> {
    return this.httpService.get(`customers/${customerId}`);
  }

  create(customer: Customer): Observable<Customer> {
    return this.httpService.post('customers', { customer });
  }

  update(customer: Customer, customerId: string): Observable<Customer> {
    return this.httpService.put(`customers/${customerId}`, { customer });
  }
}
