import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ModuleModel } from '../privileges/module.model';
import { AuthModel } from './auth.model';
import { OfficeModel } from './office.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly httpService: HttpService,
  ) { }
  
  private auth$: Subject<AuthModel> = new Subject();
  private authStatus$: Subject<boolean> = new Subject();
  private auth: AuthModel|null = null;
  private modules: ModuleModel[] = [
    { label: 'Seace', name: 'seace' },
    { label: 'Busqueda Admin', name: 'search' },
    { label: 'Busqueda', name: 'searchCommercial', info: 'Area comercial' },
    { label: 'Obras', name: 'constructions' },
    { label: 'Empresas', name: 'businesses' },
    { label: 'Consorsios', name: 'partnerships' },
    { label: 'Beneficiarios', name: 'beneficiaries' },
    { label: 'Financieras', name: 'financiers' },
    { label: 'Formatos', name: 'templates' },
    { label: 'Usuarios', name: 'users' },
    { label: 'Egresos', name: 'expenses' },
    { label: 'Personal', name: 'workers' },
    { label: 'Garantias', name: 'cheques' },
    { label: 'Garantias', name: 'chequesCommercial', info: 'Area comercial' },
    { label: 'Lineas de credito', name: 'credits' },
    { label: 'Fianzas', name: 'guaranties' },
    { label: 'Seguros', name: 'insurances' },
    { label: 'Suma asegurada', name: 'r1', info: 'Reportes' },
    { label: 'Primas', name: 'r2', info: 'Reportes' },
    { label: 'Documentacion legal', name: 'r3', info: 'Reportes' },
    { label: 'Documentacion faltante', name: 'r4', info: 'Reportes' },
    { label: 'Obras sin documentacion', name: 'r5', info: 'Reportes' },
    { label: 'Seguro 1', name: 'r6', info: 'Reportes' },
    { label: 'Seguro 2', name: 'r7', info: 'Reportes' },
    { label: 'Lineas de credito', name: 'r8', info: 'Reportes' },
    { label: 'Avance de obras', name: 'r9', info: 'Reportes' },
    { label: 'Recaudacion', name: 'r10', info: 'Reportes' },
  ]

  private objectModules = {
    seace: false,
    search: false,
    searchCommercial: false,
    constructions: false,
    businesses: false,
    partnerships: false,
    templates: false,
    beneficiaries: false,
    financiers: false,
    users: false,
    expenses: false,
    workers: false,
    cheques: false,
    chequesCommercial: false,
    credits: false,
    guaranties: false,
    insurances: false,
    r1: false,
    r2: false,
    r3: false,
    r4: false,
    r5: false,
    r6: false,
    r7: false,
    r8: false,
    r9: false,
    r10: false,
  }

  getObjectModules() {
    return this.objectModules;
  }

  getModules() {
    return this.modules;
  }

  public setOffice(office: OfficeModel) {
    return this.httpService.get(`auth/setOffice/${office._id}`);
  }

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
    this.authStatus$.next(true);
  }

  loggedOut(): void {
    this.authStatus$.next(false);
  }

  handleAuthStatus(): Observable<boolean> {
    return this.authStatus$.asObservable();
  }

  handleAuth() {
    setTimeout(() => {
      if (this.auth) {
        this.auth$.next(this.auth);
      }
    });
    return this.auth$.asObservable();
  }

  setAuth(auth: AuthModel) {
    this.auth = auth;
    this.auth$.next(this.auth);
  }

  register(signupForm: any): Observable<void> {
    return this.httpService.post('signup', signupForm);
  }

  logout(): void {
    this.setAccessToken(null);
    this.authStatus$.next(false);
    location.reload();
  }

  getSession(accessToken: string|null): Observable<AuthModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
    return this.httpService.get('profile', { headers });
  }
}
