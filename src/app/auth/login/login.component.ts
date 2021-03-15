import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private router: Router,
    private matSnackBar: MatSnackBar,
    private authService: AuthService, 
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', [Validators.required, Validators.minLength(8)] ],
    });
  }
  
  public version: string = environment.version;
  public loginForm: FormGroup;
  public isLoading: boolean = false;

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.navigationService.loadSpinnerStart();
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.authService.setAccessToken(res.accessToken);
        this.navigationService.loadSpinnerFinish();
        this.router.navigate(['/dashboard']).then(() => {
          location.reload();
        });
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.matSnackBar.open('Usuario o contraseña incorrectos', 'Aceptar', {
          duration: 5000,
        });
      });
    }
  }
}
