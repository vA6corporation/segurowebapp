import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

interface Options {
    headers?: HttpHeaders,
    params?: Params,
}

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(
        private readonly http: HttpClient,
    ) { }

    private baseUrl: string = environment.baseUrl;
    public accessToken: string | null = null;

    get(url: string, options?: Options): Observable<any> {
        let headers = options?.headers;
        const params = options?.params;
        if (!headers) {
            headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.accessToken}`
            });
        }
        return this.http.get(`${this.baseUrl}${url}`, { headers, params });
    }

    post(url: string, body: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`
        });
        return this.http.post(`${this.baseUrl}${url}`, body, { headers });
    }

    postForm(url: string, body: any): Observable<any> {
        const headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`
        });
        return this.http.post(`${this.baseUrl}${url}`, body, { headers });
    }

    postProgress(url: string, body: any): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders({
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`
        });
        const req = new HttpRequest('POST', `${this.baseUrl}${url}`, body, {
            headers,
            reportProgress: true
        });
        return this.http.request(req)
    }

    put(url: string, body: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`
        });
        return this.http.put(`${this.baseUrl}${url}`, body, { headers });
    }

    delete(url: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`
        });
        return this.http.delete(`${this.baseUrl}${url}`, { headers });
    }
}
