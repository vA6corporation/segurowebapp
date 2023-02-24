import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { InsuranceBusinessesService } from '../insurance-businesses.service';

@Component({
  selector: 'app-edit-insurance-businesses',
  templateUrl: './edit-insurance-businesses.component.html',
  styleUrls: ['./edit-insurance-businesses.component.sass']
})
export class EditInsuranceBusinessesComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly businessesService: InsuranceBusinessesService,
    private readonly navigationService: NavigationService,
    private readonly activatedRoute: ActivatedRoute,
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

  private businessId: string = '';
  public isLoading: boolean = false;
  public maxlength: number = 11;

  ngOnInit(): void { 
    this.navigationService.setTitle('Editar cliente');
    this.navigationService.backTo();
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

    this.activatedRoute.params.subscribe(params => {
      this.businessId = params.businessId;
      this.businessesService.getBusinessById(this.businessId).subscribe(business => {
        this.formGroup?.setValue(business);
      });
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      this.businessesService.update(this.formGroup.value, this.businessId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Registrado correctamente');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
