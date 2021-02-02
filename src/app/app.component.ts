import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { LoadScreenService } from './navigation/loadScreen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(
    private loadScreenService: LoadScreenService,
    private authService: AuthService,
    private router: Router,
  ) {}

  isLoading: boolean = true;
  isStart: boolean = false;

  ngOnInit(): void {
    this.loadScreenService.loadState$.subscribe((loadState: boolean) => {
      this.isLoading = loadState;
    });
    const accessToken = localStorage.getItem('accessToken');
    this.authService.getSession(accessToken).subscribe(res => {
      console.log(res);
      this.authService.userId = res.userId;
      this.authService.businessId = res.businessId;
      this.authService.userName$.emit(res.name);
      this.authService.setAccessToken(accessToken);
      this.loadScreenService.loadFinish();
      this.isStart = true;
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.router.navigate(['/login']);
      this.authService.setAccessToken(null);
      this.loadScreenService.loadFinish();
      this.isStart = true;
    });
  }
}
