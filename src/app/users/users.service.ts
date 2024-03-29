import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getUsers(): Observable<UserModel[]> {
    return this.httpService.get(`users`);
  }

  getUsersByKey(key: string): Observable<UserModel[]> {
    return this.httpService.get(`users/byKey/${key}`);
  }

  getUsersByPage(pageIndex: number, pageSize: number, params: Params): Observable<UserModel[]> {
    return this.httpService.get(`users/byPage/${pageIndex}/${pageSize}`, params);
  }

  getCountUsers(params: Params): Observable<number> {
    return this.httpService.get('users/countUsers', params);
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
