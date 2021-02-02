import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadScreenService {

  constructor() {}

  loadState$ = new EventEmitter<boolean>();

  loadStart() {
    this.loadState$.emit(true);
  }

  loadFinish() {
    this.loadState$.emit(false);
  }
}
