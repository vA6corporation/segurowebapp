import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.sass']
})
export class CreateUsersComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private matSnackBar: MatSnackBar,
    private navigationService: NavigationService,
    private router: Router,
  ) { 
    this.formGroup = this.formBuilder.group({
      name: [ null, Validators.required ],
      email: [ null, [ Validators.required, Validators.email ] ],
      password: [ null, [ Validators.required, Validators.minLength(8) ] ],
      allGuaranties: false,
    });
  }

  public formGroup: FormGroup;
  public isLoading: boolean = false;

  ngOnInit(): void {}
  
  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadSpinnerStart();
      this.usersService.create(this.formGroup.value).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.router.navigate(['/users']);
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
