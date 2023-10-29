import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getDevicesByUser(userId: string) {
    return this.httpService.get(`devices/${userId}`);
  }

  update(deviceId: string) {
    return this.httpService.put(`devices/${deviceId}`, {});
  }

  delete(deviceId: string) {
    return this.httpService.delete(`devices/${deviceId}`);
  }

}
