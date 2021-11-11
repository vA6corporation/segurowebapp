import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { UserModel } from 'src/app/users/user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
  ) { }

  private user$: Subscription = new Subscription();

  public user: UserModel|null = null;

  ngOnInit(): void {
    this.navigationService.setTitle('Cerrar sesion');
    
    this.user$ = this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
