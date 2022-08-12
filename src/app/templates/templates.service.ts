import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  getTemplate() {
    return this.httpService.get('templates');
  }

}
