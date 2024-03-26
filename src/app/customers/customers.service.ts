import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { CustomerModel } from './customer.model';
import { Observable } from 'rxjs';
import { CustomerNodeModel } from './customer-node.model';

@Injectable({
    providedIn: 'root'
})
export class CustomersService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getCustomerById(customerId: string): Observable<CustomerModel> {
        return this.httpService.get(`customers/byId/${customerId}`);
    }

    getCustomersByPage(
        pageIndex: number,
        pageSize: number,
    ): Observable<CustomerModel[]> {
        return this.httpService.get(`customers/byPage/${pageIndex}/${pageSize}`);
    }

    getCountCustomers(): Observable<number> {
        return this.httpService.get('customers/countCustomers');
    }

    getCustomersByKey(
        key: string,
    ): Observable<CustomerModel[]> {
        return this.httpService.get(`customers/byKey/${key}`);
    }

    create(customer: any): Observable<CustomerModel> {
        return this.httpService.post('customers', { customer });
    }

    update(customer: any, customerId: string): Observable<void> {
        return this.httpService.put(`customers/${customerId}`, { customer });
    }

    getCustomerNodesByTypeCustomer(type: string,  customerId: string): Observable<CustomerNodeModel[]> {
        return this.httpService.get(`customerNodes/byTypeCustomer/${type}/${ customerId}`);
    }

    uploadFile(
        file: File,
        nodeId: string,
        prefix: string,
    ) {
        return this.httpService.postStorage(file, nodeId, prefix)
    }

    createNode( customerNode: any): Observable<CustomerModel> {
        return this.httpService.post('customerNodes', {  customerNode });
    }

    updateNode( customerNode: any,  customerNodeId: string): Observable<void> {
        return this.httpService.put(`customerNodes/${ customerNodeId}`, {  customerNode });
    }

    deleteNode( customerNodeId: string): Observable<void> {
        return this.httpService.delete(`customerNodes/${ customerNodeId}`);
    }

}
