import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpService } from '../http.service';
import { CustomerPdfModel } from './customer-pdf.model';
import { CustomerModel } from './customer.model'

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  
  constructor(
    private readonly httpService: HttpService,
  ) { }

  getCustomersByAny(key: string): Observable<CustomerModel[]> {
    return this.httpService.get(`customers/byAny/${key}`);
  }

  getCustomers(): Observable<CustomerModel[]> {
    return this.httpService.get('customers');
  }

  getCustomersByPage(pageIndex: number, pageSize: number): Observable<CustomerModel[]> {
    return this.httpService.get(`customers/byPage/${pageIndex}/${pageSize}`);
  }

  getCustomersCount(): Observable<number> {
    return this.httpService.get('customers/count');
  }

  getCustomerById(customerId: string): Observable<CustomerModel> {
    return this.httpService.get(`customers/byCustomerId/${customerId}`);
  }

  create(customer: CustomerModel): Observable<CustomerModel> {
    return this.httpService.post('customers', { customer });
  }

  update(customer: CustomerModel, customerId: string): Observable<CustomerModel> {
    return this.httpService.put(`customers/${customerId}`, { customer });
  }

  getPdfs(customerId: string): Observable<CustomerPdfModel[]> {
    return this.httpService.get(`customers/pdfsByCustomerId/${customerId}`);
  }

  uploadPdf(formData: FormData, customerId: string): Observable<string> {
    return this.httpService.postForm(`customers/uploadPdf/${customerId}`, formData);
  }

  deletePdf(customerPdfId: string, pdfId: string): Observable<void> {
    return this.httpService.delete(`customers/deletePdf/${customerPdfId}/${pdfId}`);
  }
  
}
