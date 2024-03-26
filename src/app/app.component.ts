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

    isStart: boolean = false;
    isLoading: boolean = true;
    private currentPath: string = '';
    private mainScreens = [
        '/',
        '/surveys',
        '/operations',
        '/seace/seaceInbox',
        '/seace',
        '/notifications',
        '/search',
        '/search/commercial',
        '/financiers',
        '/users',
        '/workers',
        '/cheques',
        '/credits',
        '/customers',
        '/certifiers',
        '/compliances',
        '/directs',
        '/materials',
        '/constructions',
        '/constructions/commercial',
        '/partnerships',
        '/businesses',
        '/businesses/commercial',
        '/beneficiaries',
        '/guaranties',
        '/mails',
        '/insurancesSctr',
        '/insurancesSoat',
        '/insurancesVidaley',
        '/insurancesPolizacar',
        '/insurancesPolizatrec',
        '/insurancesPolizaear',
        '/insurancesMultirriesgos',
        '/insurancesRcivil',
        '/insurancesVehicular',
        '/insurancesVida',
        '/insurancesEps',
        '/insurancesSalud',
        '/insurancesAccidentes',
        '/insurancesFola',
        '/insurancesViaje',
        '/insuranceBusinesses',
        '/insurancePartnerships',
        '/brokers',
        '/insuranceConstructions',
        '/insurances/renew',
        '/insurances/report/reportPie',
        '/templates',
        '/shareholders',
        '/templatePartnerships',
        '/providers',
        '/paymentOrders',
        '/payments',
        '/banks',
        '/constructions/collection',
        '/paymentOrders/report',
        '/tools/importPayments',
        '/collections',
        '/primas',
        '/legals',
        '/documentation',
        '/constructions/withoutDocumentation',
        '/businesses/withoutDocumentation',
        '/insurances/report/report',
        '/credits/report',
        '/constructions/percentCompletions',
        '/constructions/updatePercentCompletions',
        '/workers/commissions',
        '/workers/timing',
        '/settings',
        '/logout'
    ]

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
        this.authService.setAccessToken(accessToken);
        this.authService.getSession(accessToken).subscribe(auth => {
            // this.authService.setAccessToken(accessToken);
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
                    // this.navigationService.isMainToolbar();
                    if (this.mainScreens.includes(this.router.url.split('?')[0])) {
                        this.navigationService.setIsMainScreen(true)
                    } else {
                        this.navigationService.setIsMainScreen(false)
                    }
                }
                this.currentPath = this.router.url.split('?')[0];
            }
        });
    }
}
