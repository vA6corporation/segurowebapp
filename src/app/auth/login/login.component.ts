import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NavigationService } from 'src/app/navigation/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService, 
    private readonly formBuilder: FormBuilder,
    private readonly navigationService: NavigationService,
  ) { }
  
  public loginForm: FormGroup = this.formBuilder.group({
    email: [ '', [Validators.required, Validators.email] ],
    password: [ '', [Validators.required, Validators.minLength(8)] ],
  });

  public version: string = environment.version;
  public isLoading: boolean = false;

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.authService.setAccessToken(res.accessToken);
        this.navigationService.loadBarFinish();
        this.router.navigate(['/dashboard']).then(() => {
          location.reload();
        });
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Usuario o contraseña incorrectos');
      });
    }
  }
}
