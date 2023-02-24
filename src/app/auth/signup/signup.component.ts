import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
    private readonly authService: AuthService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly navigationService: NavigationService,
    private readonly router: Router,  
  ) { }
    
  public signupForm: UntypedFormGroup = this.formBuilder.group({
    user: this.formBuilder.group({
      email: [ null, [ Validators.required, Validators.email ] ],
      password: '123',
      // allGuaranties: true,
    }),
    // business: this.formBuilder.group({
    //   name: [ null, Validators.required ],
    //   document: [ null, [ Validators.required, Validators.minLength(11), Validators.maxLength(11) ] ],
    // }),
  });
  public isLoading: boolean = false;

  ngOnInit(): void {}

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      this.authService.register(this.signupForm.value).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.router.navigate(['/login']);
        this.navigationService.showMessage('Registrado correctamente')
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
