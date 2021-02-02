import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LoadScreenService } from 'src/app/navigation/loadScreen.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.sass']
})
export class EditUsersComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private matSnackBar: MatSnackBar,
    private loadScreenService: LoadScreenService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.userForm = this.formBuilder.group({
      name: [ null, Validators.required ],
      email: [ null, [ Validators.required, Validators.email ] ],
      password: [ null, Validators.required ],
      businessId: [ null, Validators.required ],
    });

    this.activatedRoute.params.subscribe(async params => {
      this.userId = params.userId;
      this.usersService.getUserById(this.userId).subscribe(user => {
        this.userForm.controls.name.setValue(user.name);
        this.userForm.controls.email.setValue(user.email);
        this.userForm.controls.password.setValue(user.password);
        this.userForm.controls.businessId.setValue(user.businessId);
      });
    });
  }

  public userForm: FormGroup;
  private userId: string = '';
  public isLoading: boolean = false;

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      this.loadScreenService.loadStart();
      this.usersService.update(this.userForm.value, this.userId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.loadScreenService.loadFinish();
        this.matSnackBar.open('Se han guardado los cambios', 'Aceptar', {
          duration: 5000,
        });
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.loadScreenService.loadFinish();
        this.matSnackBar.open(error.error.message, 'Aceptar', {
          duration: 5000,
        });
      });
    }
  }
}
