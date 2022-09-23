import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { OfficesService } from 'src/app/offices/offices.service';
import { UserModel } from 'src/app/users/user.model';
import { AuthService } from '../auth.service';
import { OfficeModel } from '../office.model';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

  constructor(
    private readonly navigationService: NavigationService,
    private readonly authService: AuthService,
    private readonly officesService: OfficesService,
    private readonly router: Router,
  ) { }

  public office: OfficeModel = new OfficeModel();
  public user: UserModel|null = null;
  public offices: OfficeModel[] = [];

  private auth$: Subscription = new Subscription();
  private offices$: Subscription = new Subscription();

  ngOnDestroy() {
    this.auth$.unsubscribe();
    this.offices$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Cerrar sesion');
    
    this.auth$ = this.authService.handleAuth().subscribe(auth => {
      this.user = auth.user;
    });

    this.offices$ = this.officesService.getActiveOffices().subscribe(offices => {
      this.offices = offices;
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
  }

  onOfficeSelected(office: OfficeModel,) {
    this.authService.setOffice(office).subscribe(res => {
      console.log(res);
      this.authService.setAccessToken(res.accessToken);
      this.router.navigate(['']).then(() => {
        location.reload();
      });
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
