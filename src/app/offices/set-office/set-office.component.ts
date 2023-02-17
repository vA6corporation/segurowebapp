import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { OfficeModel } from 'src/app/auth/office.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { UserModel } from 'src/app/users/user.model';
import { OfficesService } from '../offices.service';

@Component({
  selector: 'app-set-office',
  templateUrl: './set-office.component.html',
  styleUrls: ['./set-office.component.sass']
})
export class SetOfficeComponent implements OnInit {

  constructor(
    private readonly navigationService: NavigationService,
    private readonly authService: AuthService,
    private readonly officesService: OfficesService,
    private readonly router: Router,
  ) { }

  public office: OfficeModel = new OfficeModel();
  public user: UserModel|null = null;
  public offices: OfficeModel[] = [];

  private handleAuth$: Subscription = new Subscription();
  private handleOffices$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleAuth$.unsubscribe();
    this.handleOffices$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Seleccione oficina');
    this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
      this.user = auth.user;
    });

    this.handleOffices$ = this.officesService.handleOffices().subscribe(offices => {
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
  }

}
