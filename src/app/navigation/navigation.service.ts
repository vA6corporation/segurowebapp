import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

  public searchState$: EventEmitter<string> = new EventEmitter();
  public loadBarState$ = new EventEmitter<boolean>();
  public loadSpinnerState$ = new EventEmitter<boolean>();

  handleSearch(key: string) {
    this.searchState$.emit(key);
  }

  loadBarStart() {
    this.loadBarState$.emit(true);
  }

  loadBarFinish() {
    this.loadBarState$.emit(false);
  }

  loadSpinnerStart() {
    this.loadSpinnerState$.emit(true);
  }

  loadSpinnerFinish() {
    this.loadSpinnerState$.emit(false);
  }

}
