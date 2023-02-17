import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { NavigationService } from './navigation/navigation.service';
import { DialogNotificationsComponent } from './notifications/dialog-notifications/dialog-notifications.component';
import { NotificationsService } from './notifications/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly navigationService: NavigationService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly matDialog: MatDialog,
  ) { }

  public isStart: boolean = false;
  public isLoading: boolean = true;
  private currentPath: string = '';

  ngOnInit(): void {
    this.navigationService.handleLoadSpinner().subscribe(state => {
      this.isLoading = state;
    });

    this.authService.handleAuthStatus().subscribe(() => {
      this.notificationsService.getActiveNotifications().subscribe(notifications => {
        if (notifications.length) {
          this.matDialog.open(DialogNotificationsComponent, {
            width: '600px',
            position: { top: '20px' },
            data: notifications,
          });
        }
      });
    });

    const accessToken = localStorage.getItem('accessToken');

    this.authService.getSession(accessToken).subscribe(auth => {
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
