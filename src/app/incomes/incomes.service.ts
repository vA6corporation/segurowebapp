import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  

}
