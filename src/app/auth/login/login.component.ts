import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadScreenService } from 'src/app/navigation/loadScreen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService, 
    private formBuilder: FormBuilder,
    private loadScreenService: LoadScreenService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', [Validators.required, Validators.minLength(8)] ],
    });
  }
    
  public loginForm: FormGroup;
  public isLoading: boolean = false;

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loadScreenService.loadStart();
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.authService.setAccessToken(res.accessToken);
        this.loadScreenService.loadFinish();
        this.router.navigate(['/dashboard']);
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.loadScreenService.loadFinish();
        this.snackBar.open('Usuario o contraseña incorrectos', 'Aceptar', {
          duration: 5000,
        });
      });
    }
  }
}
