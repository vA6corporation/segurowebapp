import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadScreenService } from 'src/app/navigation/loadScreen.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loadScreenService: LoadScreenService,
  ) {
    this.signupForm = this.formBuilder.group({
      user: this.formBuilder.group({
        email: [ null, [ Validators.required, Validators.email ] ],
        password: [ null, [ Validators.required, Validators.minLength(8) ] ],
      }),
      business: this.formBuilder.group({
        name: [ null, Validators.required ],
        ruc: [ null, [ Validators.required, Validators.minLength(11), Validators.maxLength(11) ] ],
      }),
    });
  }
    
  public signupForm: FormGroup;
  public isLoading: boolean = false;

  ngOnInit(): void {}

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.loadScreenService.loadStart();
      this.authService.register(this.signupForm.value).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.loadScreenService.loadFinish();
        this.snackBar.open('Usuario creado correctamente', 'Aceptar', {
          duration: 5000,
        });
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.loadScreenService.loadFinish();
        this.snackBar.open(error.error.message, 'Aceptar', {
          duration: 5000,
        });
      });
    }
  }

}
