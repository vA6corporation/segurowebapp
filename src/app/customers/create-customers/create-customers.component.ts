import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoadScreenService } from 'src/app/navigation/loadScreen.service';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-create-customers',
  templateUrl: './create-customers.component.html',
  styleUrls: ['./create-customers.component.sass']
})
export class CreateCustomersComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private customersService: CustomersService,
    private matSnackBar: MatSnackBar,
    private loadScreenService: LoadScreenService,
    private router: Router,
  ) {
    this.customerForm = this.formBuilder.group({
      typeDocument: [ null, Validators.required ],
      document: [ null, Validators.required ],
      name: [ null, Validators.required ],
      email: [ null, [ Validators.required, Validators.email ] ],
      phoneNumber: [ null, [Validators.required, Validators.minLength(9)] ],
    });

    this.customerForm.controls.typeDocument.valueChanges.subscribe(value => {
      switch (value) {
        case 'RUC':
          this.customerForm.controls.document.setValidators([ Validators.required, Validators.minLength(11), Validators.maxLength(11) ]);
          break;
        case 'DNI':
          this.customerForm.controls.document.setValidators([ Validators.required, Validators.minLength(8), Validators.maxLength(8) ]);
          break;
        default:
          this.customerForm.controls.document.setValidators([ Validators.required ]);
          break;
      }
      this.customerForm.controls.document.updateValueAndValidity();
    });
  }
    
  public customerForm: FormGroup;
  public isLoading: boolean = false;
  
  ngOnInit(): void {}

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.isLoading = true;
      this.loadScreenService.loadStart();
      this.customersService.create(this.customerForm.value).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.loadScreenService.loadFinish();
        this.router.navigate(['/customers']);
        this.matSnackBar.open('Cliente registrado correctamente', 'Aceptar', {
          duration: 5000
        });
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.loadScreenService.loadFinish();
        this.matSnackBar.open(error.error.message, 'Aceptar', {
          duration: 5000
        });
      });
    }
  }
}
