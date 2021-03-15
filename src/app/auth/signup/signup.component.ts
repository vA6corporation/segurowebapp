import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  constructor(
    private matSnackBar: MatSnackBar,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private router: Router,  
  ) {
    this.signupForm = this.formBuilder.group({
      user: this.formBuilder.group({
        email: [ null, [ Validators.required, Validators.email ] ],
        password: [ null, [ Validators.required, Validators.minLength(8) ] ],
      }),
      business: this.formBuilder.group({
        name: [ null, Validators.required ],
        document: [ null, [ Validators.required, Validators.minLength(11), Validators.maxLength(11) ] ],
      }),
    });
  }
    
  public signupForm: FormGroup;
  public isLoading: boolean = false;

  ngOnInit(): void {}

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.navigationService.loadSpinnerStart();
      this.authService.register(this.signupForm.value).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.router.navigate(['/login']);
        this.matSnackBar.open('Registrado correctamente', 'Aceptar', {
          duration: 5000,
        });
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.matSnackBar.open(error.error.message, 'Aceptar', {
          duration: 5000,
        });
      });
    }
  }

}
