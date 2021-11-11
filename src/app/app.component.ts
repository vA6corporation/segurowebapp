import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { NavigationService } from './navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(
    private readonly navigationService: NavigationService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  isLoading: boolean = true;
  isStart: boolean = false;

  ngOnInit(): void {
    this.navigationService.handlerLoadSpinner().subscribe(state => {
      this.isLoading = state;
    });
    const accessToken = localStorage.getItem('accessToken');
    this.authService.getSession(accessToken).subscribe(res => {
      console.log(res);
      this.authService.setAccessToken(accessToken);
      const { user, business } = res;
      this.authService.loggedIn();
      this.authService.setUser(user);
      this.authService.setBusiness(business);
      this.navigationService.loadSpinnerFinish();
      this.isStart = true;
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.router.navigate(['/login']);
      this.navigationService.loadSpinnerFinish();
      this.isStart = true;
    });

    this.router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        this.route.data.subscribe(() => {
          this.navigationService.setMenu([]);
          this.navigationService.isMainToolbar();
        });
      }
    });
  }
}
