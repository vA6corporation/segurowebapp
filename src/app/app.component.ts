import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from './auth/auth.service';
import { BusinessesService } from './businesses/businesses.service';
import { DialogBirthdayComponent } from './businesses/dialog-birthday/dialog-birthday.component';
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
        private readonly businessesService: BusinessesService,
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
            this.authService.handleAuth().pipe(first()).subscribe(auth => {
                if (environment.production) {
                    this.businessesService.getBusinessesBirthday().subscribe(businesses => {
                        if (businesses.length) {
                            this.matDialog.open(DialogBirthdayComponent, {
                                width: '800px',
                                position: { top: '20px' },
                                data: businesses,
                            });
                        }
                    });
                    if (auth.user.showAllNotifications) {
                        this.notificationsService.getActiveNotifications().subscribe(notifications => {
                            if (notifications.length) {
                                this.matDialog.open(DialogNotificationsComponent, {
                                    width: '800px',
                                    position: { top: '20px' },
                                    data: notifications,
                                });
                            }
                        });
                    } else {
                        if (auth.user.workerId) {
                            this.notificationsService.getNotificationsByWorker(auth.user.workerId).subscribe(notifications => {
                                if (notifications.length) {
                                    this.matDialog.open(DialogNotificationsComponent, {
                                        width: '800px',
                                        position: { top: '20px' },
                                        data: notifications,
                                    });
                                }
                            });
                        }
                    }
                }
            });
        });

        let deviceId = localStorage.getItem('deviceId');

        if (deviceId === null) {
            deviceId = uuidv4();
            localStorage.setItem('deviceId', deviceId);
        }

        const accessToken = localStorage.getItem('accessToken');
        this.authService.getSession(accessToken).subscribe(auth => {
            this.authService.setAccessToken(accessToken);
            this.authService.setAuth(auth);
            if (auth.user.devices.find(e => e.deviceId === deviceId)) {
                this.navigationService.loadSpinnerFinish();
                this.isStart = true;
                if (auth.office) {
                    this.authService.loggedIn();
                    if (location.pathname === '/login') {
                        this.router.navigate(['/']);
                    }
                } else {
                    this.router.navigate(['/setOffice']);
                }
            } else {
                this.isStart = true;
                this.navigationService.loadSpinnerFinish();
                this.router.navigate(['/device']);
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
