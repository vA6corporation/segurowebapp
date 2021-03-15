import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { FinanciersService } from '../financiers.service';

@Component({
  selector: 'app-create-financiers',
  templateUrl: './create-financiers.component.html',
  styleUrls: ['./create-financiers.component.sass']
})
export class CreateFinanciersComponent implements OnInit {

  constructor(
    private financiersService: FinanciersService,
    private navigationService: NavigationService,
    private router: Router,
    private matSnackBar: MatSnackBar,
  ) {
    this.financierForm = this.formBuilder.group({
      document: [ null, [ Validators.required, Validators.minLength(11), Validators.maxLength(11) ] ],
      name: [ null, Validators.required ],
      email: [ null, [ Validators.required, Validators.email ] ],
      mobileNumber: null,
      phoneNumber: null,
      annexed: null,
    });
  }
    
  private formBuilder: FormBuilder = new FormBuilder();
  public financierForm: FormGroup;
  public isLoading: boolean = false;

  ngOnInit(): void {}

  async onSubmit() {
    if (this.financierForm.valid) {
      this.isLoading = true;
      this.navigationService.loadSpinnerStart();
      this.financiersService.create(this.financierForm.value).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.router.navigate(['/financiers']);
        this.matSnackBar.open('Financiera registrada correctamente', 'Aceptar', {
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
