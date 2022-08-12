import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
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
    private readonly router: Router,
  ) { }

  isLoading: boolean = true;
  isStart: boolean = false;
  currentPath: string = '';

  ngOnInit(): void {
    this.navigationService.handleLoadSpinner().subscribe(state => {
      this.isLoading = state;
    });
    const accessToken = localStorage.getItem('accessToken');
    this.authService.getSession(accessToken).subscribe(auth => {
      console.log(auth);
      this.authService.setAccessToken(accessToken);
      this.authService.setAuth(auth);
      this.navigationService.loadSpinnerFinish();
      this.isStart = true;
      if (auth.office) {
        this.authService.loggedIn();
      } else {
        this.router.navigate(['/setOffice']);
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.router.navigate(['/login']);
      this.navigationService.loadSpinnerFinish();
      this.isStart = true;
    });

    this.router.events.forEach(event => {
      if (event instanceof NavigationEnd) {
        if (this.currentPath !== this.router.url.split('?')[0]) {
          this.navigationService.setMenu([]);
          this.navigationService.isMainToolbar();
        }
        this.currentPath = this.router.url.split('?')[0];
      }
    });
  }
}
