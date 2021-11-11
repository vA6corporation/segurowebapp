import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BusinessModel } from 'src/app/auth/business.model';
import { UserModel } from 'src/app/users/user.model';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.sass']
})
export class SidenavListComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Output() sidenavClose = new EventEmitter<void>();
  public user$: Subscription = new Subscription();
  public business$: Subscription = new Subscription();

  public user: UserModel|null = null
  public business: BusinessModel|null = null

  public panelOpenState = false;

  onClose() {
    this.sidenavClose.emit();
  }

  ngOnInit(): void {
    this.business$ = this.authService.getBusiness().subscribe(business => {
      this.business = business;
    });
    this.user$ = this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  onLogout() {
    this.authService.logout();
    this.sidenavClose.emit();
  }

}
