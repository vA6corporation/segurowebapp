import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { OfficeModel } from 'src/app/auth/office.model';
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

  @Output() 
  sidenavClose = new EventEmitter<void>();
  
  public user: UserModel|null = null
  public office: OfficeModel|null = null;
  public panelOpenState = false;
  public privileges: any = {};
  
  private auth$: Subscription = new Subscription();

  ngOnDestroy() {
    this.auth$.unsubscribe();
  }

  ngOnInit(): void {
    this.auth$ = this.authService.handleAuth().subscribe(auth => {
      this.user = auth.user;
      this.office = auth.office;
      Object.assign(this.privileges, this.user.privileges || {});
    });
  }
 
  onClose() {
    this.sidenavClose.emit();
  }

  onLogout() {
    this.authService.logout();
    this.sidenavClose.emit();
  }

}
