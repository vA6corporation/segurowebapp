import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { UserModel } from '../users/user.model';
import { BusinessModel } from './business.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly httpService: HttpService,
  ) { }
  
  private user$: Subject<UserModel|null> = new Subject();
  private business$: Subject<BusinessModel|null> = new Subject();
  private authStatus$: EventEmitter<boolean> = new EventEmitter();

  private user: UserModel|null = null;
  private business: BusinessModel|null = null;

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
    this.authStatus$.emit(true);
  }

  loggedOut(): void {
    this.authStatus$.emit(false);
  }

  handleAuthStatus(): Observable<boolean> {
    return this.authStatus$.asObservable();
  }

  setUser(user: UserModel): void {
    this.user = user;
    this.user$.next(user);
  }

  getUser(): Observable<UserModel|null> {
    setTimeout(() => {
      this.user$.next(this.user);
    });
    return this.user$.asObservable();
  }

  // getAuth() {
  //   setTimeout(() => {
  //     if (this.auth) {
  //       this.auth$.next(this.auth);
  //     }
  //   });
  //   return this.auth$.asObservable();
  // }

  setBusiness(business: BusinessModel): void {
    this.business = business;
    this.business$.next(business);
  }

  getBusiness(): Observable<BusinessModel|null> {
    setTimeout(() => {
      this.business$.next(this.business);
    });
    return this.business$.asObservable();
  }

  register(signupForm: any): Observable<void> {
    return this.httpService.post('businesses', signupForm);
  }

  logout(): void {
    this.setAccessToken(null);
    this.authStatus$.emit(false);
  }

  getSession(accessToken: string|null): Observable<{ user: UserModel, business: BusinessModel }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
    return this.httpService.get('profile', { headers });
  }
}
