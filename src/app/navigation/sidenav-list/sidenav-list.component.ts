import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.sass']
})
export class SidenavListComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  @Output() sidenavClose = new EventEmitter<void>();

  public panelOpenState = false;

  onClose() {
    this.sidenavClose.emit();
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.logout();
    this.sidenavClose.emit();
  }

}
