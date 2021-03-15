import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BeneficiariesService } from '../beneficiaries.service';

@Component({
  selector: 'app-create-beneficiaries',
  templateUrl: './create-beneficiaries.component.html',
  styleUrls: ['./create-beneficiaries.component.sass']
})
export class CreateBeneficiariesComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private beneficiariesService: BeneficiariesService,
    private matSnackBar: MatSnackBar,
    private navigationService: NavigationService,
    private router: Router,
    public matDialog: MatDialog,
  ) {
    this.formGroup = this.formBuilder.group({
      beneficiary: this.formBuilder.group({
        document: [ null, Validators.required ],
        name: [ null, Validators.required ],
        email: null,
        mobileNumber: null,
        phoneNumber: null,
        annexed: null,
        address: null,
      }),
    });
  }
    
  public formGroup: FormGroup;
  public isLoading: boolean = false;
  public maxlength: number = 11;
  
  ngOnInit(): void { }

  onSubmit(): void {
    console.log(this.formGroup.valid);
    
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadSpinnerStart();
      const { beneficiary } = this.formGroup.value;
      this.beneficiariesService.create(beneficiary).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.router.navigate(['/beneficiaries']); 
        this.matSnackBar.open('Registrado correctamente', 'Aceptar', {
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
