import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.sass']
})
export class TopbarComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}
    
  public isAuth: boolean = false;
  public userName: string = '';

  @Output() sidenavToggle = new EventEmitter<void>();

  ngOnInit(): void {
    this.authService.authChange$.subscribe((authState: boolean) => {
      this.isAuth = authState;
    });
    this.authService.userName$.subscribe((userName: string) => {
      this.userName = userName;
    });
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
