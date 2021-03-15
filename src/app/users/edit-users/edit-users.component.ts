import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
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
    private navigationService: NavigationService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.formGroup = this.formBuilder.group({
      name: [ null, Validators.required ],
      email: [ null, [ Validators.required, Validators.email ] ],
      password: [ null, Validators.required ],
      allGuaranties: false,
    });

    this.activatedRoute.params.subscribe(async params => {
      this.userId = params.userId;
      this.usersService.getUserById(this.userId).subscribe(user => {
        console.log(user);
        this.formGroup.patchValue(user);
      });
    });
  }

  public formGroup: FormGroup;
  private userId: string = '';
  public isLoading: boolean = false;

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadSpinnerStart();
      this.usersService.update(this.formGroup.value, this.userId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.matSnackBar.open('Se han guardado los cambios', 'Aceptar', {
          duration: 5000,
        });
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.matSnackBar.open(error.error.message, 'Aceptar', {
          duration: 5000,
        });
      });
    }
  }
}
