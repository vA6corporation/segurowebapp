import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class PrivilegesService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  update(privileges: any, userId: string): Observable<void> {
    return this.httpService.put(`privileges/${userId}`, { privileges });
  }

}
