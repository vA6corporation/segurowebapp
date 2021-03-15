import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) {}

  private baseUrl: string = environment.baseUrl;
  public accessToken: string|null = null;

  get(url: string, headers?: HttpHeaders): Observable<any> {
    if (!headers) {
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      });
    }
    return this.http.get(`${this.baseUrl}${url}`, { headers });
  }

  post(url: string, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.post(`${this.baseUrl}${url}`, body, { headers });
  }

  put(url: string, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.put(`${this.baseUrl}${url}`, body, { headers });
  }
}
