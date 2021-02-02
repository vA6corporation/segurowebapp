import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
  ) { }

  getUsersByPage(pageIndex: number, pageSize: number): Observable<User[]> {
    return this.httpService.get(`users/${pageIndex}/${pageSize}`);
  }

  getUsersCount(): Observable<number> {
    return this.httpService.get('users/count');
  }

  getUserById(userId: string): Observable<User> {
    return this.httpService.get(`users/${userId}`);
  }

  create(user: User): Observable<User> {
    user.businessId = this.authService.businessId;
    return this.httpService.post('users', { user });
  }

  update(user: User, userId: string): Observable<User> {
    return this.httpService.put(`users/${userId}`, { user });
  }

}
