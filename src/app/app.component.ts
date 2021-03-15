import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { NavigationService } from './navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(
    private navigationService: NavigationService,
    private authService: AuthService,
    private router: Router,
  ) {}

  isLoading: boolean = true;
  isStart: boolean = false;

  ngOnInit(): void {
    this.navigationService.loadSpinnerState$.subscribe((loadState: boolean) => {
      this.isLoading = loadState;
    });
    const accessToken = localStorage.getItem('accessToken');
    this.authService.getSession(accessToken).subscribe(res => {
      console.log(res);
      this.authService.setAccessToken(accessToken);
      this.authService.setUserId(res.userId);
      this.authService.setBusinessId(res.businessId);
      this.authService.setUserName(res.name);
      this.authService.loggedIn();
      this.navigationService.loadSpinnerFinish();
      this.isStart = true;
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.router.navigate(['/login']);
      this.navigationService.loadSpinnerFinish();
      this.isStart = true;
    });
  }
}
