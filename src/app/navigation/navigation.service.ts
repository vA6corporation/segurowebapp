import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

interface MenuToolbar {
  id: string
  label: string
  icon: string
  show: boolean
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private readonly matSnackBar: MatSnackBar,
  ) { }

  private loadBarStatus$ = new EventEmitter<boolean>();
  private loadSpinnerStatus$ = new EventEmitter<boolean>();
  private searchState$: EventEmitter<string> = new EventEmitter();
  private changeTitle$ = new EventEmitter<string>();
  private isMainToolbar$ = new EventEmitter<boolean>();
  private setMenu$ = new EventEmitter<MenuToolbar[]>();
  private onClickMenu$ = new EventEmitter<string>();

  handleSearch(): Observable<string> {
    return this.searchState$.asObservable();
  }

  handleClickMenu() {
    return this.onClickMenu$.asObservable();
  }

  clickMenu(id: string) {
    this.onClickMenu$.emit(id);
  }

  setMenu(menus: MenuToolbar[]) {
    this.setMenu$.emit(menus);
  }

  handleMenu() {
    return this.setMenu$.asObservable();
  }

  handleLoadSpinner(): Observable<boolean> {
    return this.loadSpinnerStatus$.asObservable();
  }

  handleLoadBar(): Observable<boolean> {
    return this.loadBarStatus$.asObservable();
  }

  loadBarStart() {
    this.loadBarStatus$.emit(true);
  }

  loadBarFinish() {
    this.loadBarStatus$.emit(false);
  }

  loadSpinnerStart() {
    this.loadSpinnerStatus$.emit(true);
  }

  loadSpinnerFinish() {
    this.loadSpinnerStatus$.emit(false);
  }

  search(key: string) {
    this.searchState$.emit(key);
  }

  showMessage(message: string) {
    this.matSnackBar.open(message, 'Aceptar', {
      duration: 5000,
    });
  }

  setTitle(title: string) {
    document.title = title;
    this.changeTitle$.emit(title);
  }

  handleTitle(): Observable<string> {
    return this.changeTitle$.asObservable();
  }

  handleBackTo(): Observable<boolean> {
    return this.isMainToolbar$.asObservable();
  }

  setIsMainScreen(isMainScreen: boolean) {
    this.isMainToolbar$.emit(isMainScreen);
  }

//   backTo() {
//     this.isMainToolbar$.emit(false);
//   }

}
