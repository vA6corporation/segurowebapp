import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly navigationService: NavigationService,
    private readonly formBuilder: FormBuilder,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    key: null,
  });

  public isAuth: boolean = false;
  public userName: string = 'User';
  public title: string = 'Horvi';
  public showSearch: boolean = false;
  public showInputSearch: boolean = false;
  public isLoadingSpinner: boolean = true;
  public isLoadingBar: boolean = false;
  public isMainToolbar: boolean = false;
  public isBackTo: boolean = false;

  @Output()
  public sidenavToggle = new EventEmitter<void>();

  @ViewChild('inputKey') inputKey!: ElementRef<HTMLInputElement>;

  public menus: any[] = [];
  public buttons: any[] = [];

  ngOnInit(): void {
    this.navigationService.handlerTitle().subscribe(title => {
      this.title = title;
    });

    this.navigationService.handlerBackTo().subscribe(isMainToolbar => {
      this.isMainToolbar = isMainToolbar;
    });

    this.navigationService.handlerBackTo().subscribe(isBackTo => {
      this.isBackTo = isBackTo;
    });
  
    this.authService.handlerAuthStatus().subscribe(isAuth => {
      console.log('isLogin', isAuth);
      
      this.isAuth = isAuth;
    });

    this.navigationService.handlerLoadSpinner().subscribe(loadState => {
      this.isLoadingSpinner = loadState;
    });

    this.navigationService.handlerLoadBar().subscribe(loadState => {
      this.isLoadingBar = loadState;
    });

    this.navigationService.handlerMenu().subscribe(menus => {
      const filterMenus = [];
      const filterButtons = [];
      this.showSearch = false;
      for (const menu of menus) {
        if (menu.id === 'search') {
          this.showSearch = true;
          continue;
        }
        if (menu.show) {
          filterButtons.push(menu);
        } else {
          filterMenus.push(menu);
        }
      }
      this.menus = filterMenus;
      this.buttons = filterButtons;
    })
  }

  onClick(id: string) {
    if (id === 'search') {
      this.showSearch = !this.showSearch;
    }
    this.navigationService.clickMenu(id);
  }

  onBack() {
    history.go(-1);
  }

  onSubmit() {
    const { key } = this.formGroup.value;
    this.formGroup.reset();
    if (key) {
      this.navigationService.search(key);
    }
  }

  onToggleToolbar(state: boolean) {
    this.isMainToolbar = state;
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  onToggleSearch() {
    if (this.showSearch) {
      setTimeout(() => {
        this.inputKey.nativeElement.focus();
      });
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
