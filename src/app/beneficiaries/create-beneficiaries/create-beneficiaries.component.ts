import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private readonly formBuilder: FormBuilder,
    private readonly beneficiariesService: BeneficiariesService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
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
  public isLoading: boolean = false;
  public maxlength: number = 11;
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Nuevo beneficiario');
    this.navigationService.backTo();
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { beneficiary } = this.formGroup.value;
      this.beneficiariesService.create(beneficiary).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.router.navigate(['/beneficiaries']); 
        this.navigationService.showMessage('Registrado correctamente');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }
  
}
