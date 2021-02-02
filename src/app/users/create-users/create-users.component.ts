import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoadScreenService } from 'src/app/navigation/loadScreen.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.sass']
})
export class CreateUsersComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private matSnackBar: MatSnackBar,
    private loadScreenService: LoadScreenService,
    private router: Router,
  ) { 
    this.userForm = this.formBuilder.group({
      name: [ null, Validators.required ],
      email: [ null, [ Validators.required, Validators.email ] ],
      password: [ null, [ Validators.required, Validators.minLength(8) ] ],
    });
  }

  public userForm: FormGroup;
  public isLoading: boolean = false;

  ngOnInit(): void {}
  
  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      this.loadScreenService.loadStart();
      this.userService.create(this.userForm.value).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.loadScreenService.loadFinish();
        this.router.navigate(['/users']);
        this.matSnackBar.open('Usuario registrado correctamente', 'Aceptar', {
          duration: 5000,
        });
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.loadScreenService.loadFinish();
        this.matSnackBar.open(error.error.message, 'Aceptar', {
          duration: 5000,
        });
      });
    }
  }
}
