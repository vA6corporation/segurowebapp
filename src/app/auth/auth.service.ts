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
  ) { }
    
  public authChange$: EventEmitter<boolean> = new EventEmitter();
  public userName$: EventEmitter<string> = new EventEmitter();
  public businessId: string = '';
  public userId: string = '';

  setAccessToken(accessToken: string|null): void {
    this.httpService.accessToken = accessToken;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.setItem('accessToken', '');
    }
  }
  
  login(email: string, password: string): Observable<any> {
    return this.httpService.post('auth/login', { email, password });
  }

  loggedIn(): void {
    this.authChange$.emit(true);
  }

  loggedOut(): void {
    this.authChange$.emit(false);
  }

  setUserName(name: string) {
    this.userName$.emit(name);
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  setBusinessId(businessId: string) {
    this.businessId = businessId;
  }

  register(signupForm: any): Observable<any> {
    return this.httpService.post('businesses', signupForm);
  }

  logout(): void {
    this.setAccessToken(null);
    this.authChange$.emit(false);
  }

  getSession(accessToken: string|null): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })
    return this.httpService.get('profile', headers);
  }
}
