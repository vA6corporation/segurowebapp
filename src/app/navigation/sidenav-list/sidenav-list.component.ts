import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BusinessModel } from 'src/app/auth/business.model';
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
  public business: BusinessModel|null = null;
  public panelOpenState = false;
  public privileges: any = {};
  
  private auth$: Subscription = new Subscription();

  ngOnDestroy() {
    this.auth$.unsubscribe();
  }

  ngOnInit(): void {
    console.log('holaxxxx');
    
    this.auth$ = this.authService.handleAuth().subscribe(auth => {
      console.log('xxxxx');
      
      console.log(auth);
      
      this.user = auth.user;
      this.business = auth.business;
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
