import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { FinanciersService } from '../financiers.service';

@Component({
  selector: 'app-edit-financiers',
  templateUrl: './edit-financiers.component.html',
  styleUrls: ['./edit-financiers.component.sass']
})
export class EditFinanciersComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private financiersService: FinanciersService,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private navigationService: NavigationService,
  ) {
    this.formGroup = this.formBuilder.group({
      document: [ null, Validators.required ],
      name: [ null, Validators.required ],
      email: [ null, [ Validators.required, Validators.email ] ],
      mobileNumber: null,
      phoneNumber: null,
      annexed: null,
    });

    this.activatedRoute.params.subscribe(async params => {
      this.financierId = params.financierId;
      this.financiersService.getFinancierById(this.financierId).subscribe(financier => {
        console.log(financier);
        this.formGroup.get('document')?.setValue(financier.document);
        this.formGroup.get('name')?.setValue(financier.name);
        this.formGroup.get('email')?.setValue(financier.email);
        this.formGroup.get('phoneNumber')?.setValue(financier.phoneNumber);
        this.formGroup.get('annexed')?.setValue(financier.annexed);
      });
    });
  }
    
  public formGroup: FormGroup;
  private financierId: string = '';
  public isLoading: boolean = false;

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadSpinnerStart();
      this.financiersService.update(this.formGroup.value, this.financierId).subscribe(res => {
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
