import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
  ) {}
    
  public authChange$: EventEmitter<boolean> = new EventEmitter();
  public userName$: EventEmitter<string> = new EventEmitter();
  public accessToken: string|null = null;
  public businessId: string = '';
  public userId: string = '';

  getAccessToken(): string|null {
    return this.accessToken;
  }

  setAccessToken(accessToken: string|null): void {
    this.accessToken = accessToken;
    this.httpService.accessToken = this.accessToken;
    if (this.accessToken) {
      localStorage.setItem('accessToken', this.accessToken);
      this.authChange$.emit(true);
    } else {
      localStorage.setItem('accessToken', '');
      this.authChange$.emit(false);
    }
  }
  
  login(email: string, password: string): Observable<any> {
    return this.httpService.post('auth/login', { email, password });
  }

  register(signupForm: any): Observable<any> {
    return this.httpService.post('businesses', signupForm);
  }

  logout(): void {
    this.setAccessToken(null);
  }

  getSession(accessToken: string|null): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })
    return this.httpService.get('profile', headers);
  }
}
