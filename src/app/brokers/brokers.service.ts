import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { BrokerModel } from './broker.model';

@Injectable({
  providedIn: 'root'
})
export class BrokersService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getBrokerById(brokerId: string): Observable<BrokerModel> {
    return this.httpService.get(`brokers/byId/${brokerId}`);
  }

  getBrokersByKey(key: string): Observable<BrokerModel[]> {
    return this.httpService.get(`brokers/byKey/${key}`);
  }

  getBrokersByPage(pageIndex: number, pageSize: number): Observable<BrokerModel[]> {
    return this.httpService.get(`brokers/byPage/${pageIndex}/${pageSize}`);
  }

  create(broker: any): Observable<BrokerModel> {
    return this.httpService.post('brokers', { broker });
  }

  update(broker: any, brokerId: string): Observable<void> {
    return this.httpService.put(`brokers/${brokerId}`, { broker });
  }

}
