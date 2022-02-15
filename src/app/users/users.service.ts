import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../http.service';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getUsersByPage(pageIndex: number, pageSize: number): Observable<UserModel[]> {
    return this.httpService.get(`users/${pageIndex}/${pageSize}`);
  }

  getUsersCount(): Observable<number> {
    return this.httpService.get('users/count');
  }

  getActiveUsers(): Observable<UserModel[]> {
    return this.httpService.get('users/activeUsers');
  }

  getUserById(userId: string): Observable<UserModel> {
    return this.httpService.get(`users/${userId}`);
  }

  create(user: UserModel): Observable<UserModel> {
    return this.httpService.post('users', { user });
  }

  update(user: UserModel, userId: string): Observable<UserModel> {
    return this.httpService.put(`users/${userId}`, { user });
  }

}
