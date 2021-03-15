import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.sass']
})
export class TopbarComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private navigationService: NavigationService,
    private formBuilder: FormBuilder,
  ) { 
    this.formGroup = this.formBuilder.group({
      key: null,
    });
  }
    
  public isAuth: boolean = false;
  public userName: string = '';
  public isLoading: boolean = false;
  public formGroup: FormGroup;

  @Output() sidenavToggle = new EventEmitter<void>();

  ngOnInit(): void {
    this.navigationService.loadBarState$.subscribe((loadState: boolean) => {
      this.isLoading = loadState;
    });
    this.authService.authChange$.subscribe((authState: boolean) => {
      this.isAuth = authState;
    });
    this.authService.userName$.subscribe((userName: string) => {
      this.userName = userName;
    });
  }

  onSubmit() {
    const { key } = this.formGroup.value;
    this.formGroup.reset();
    if (key) {
      this.navigationService.searchState$.emit(key);
    }
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
