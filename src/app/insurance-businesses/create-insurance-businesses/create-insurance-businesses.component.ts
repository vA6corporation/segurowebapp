import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { InsuranceBusinessesService } from '../insurance-businesses.service';

@Component({
  selector: 'app-create-insurance-businesses',
  templateUrl: './create-insurance-businesses.component.html',
  styleUrls: ['./create-insurance-businesses.component.sass']
})
export class CreateInsuranceBusinessesComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly businessesService: InsuranceBusinessesService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
  ) { }

  public formGroup: UntypedFormGroup = this.formBuilder.group({
    documentType: [ null, Validators.required ],
    document: [ null, Validators.required ],
    name: [ null, Validators.required ],
    email: [ null, [ Validators.required, Validators.email ] ],
    mobileNumber: null,
    phoneNumber: null,
    annexed: null,
    birthDate: null,
    address: null,
    representative: null,
    representativeDocument: null,
  });

  public isLoading: boolean = false;
  public maxlength: number = 11;
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Nueva empresa');
    this.formGroup.get('documentType')?.valueChanges.subscribe(value => {
      switch (value) {
        case 'RUC':
          this.formGroup.get('documento')?.setValidators([ Validators.required, Validators.minLength(11), Validators.maxLength(11) ]);
          this.maxlength = 11;
          break;
        case 'DNI':
          this.formGroup.get('documento')?.setValidators([ Validators.required, Validators.minLength(8), Validators.maxLength(8) ]);
          this.maxlength = 8;
          break;
      }
      this.formGroup.get('documento')?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      this.businessesService.create(this.formGroup.value).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.router.navigate(['/insuranceBusinesses']);
        this.navigationService.showMessage('Registrador correctamente');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
