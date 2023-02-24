import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { CompaniesService } from '../companies.service';

@Component({
  selector: 'app-create-companies',
  templateUrl: './create-companies.component.html',
  styleUrls: ['./create-companies.component.sass']
})
export class CreateCompaniesComponent implements OnInit {

  constructor(
    private readonly companiesService: CompaniesService,
    private readonly navigationService: NavigationService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly router: Router,
  ) { }
    
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    ruc: [ null, Validators.required ],
    name: [ null, Validators.required ],
    email: [ null, [ Validators.required, Validators.email ] ],
    address: [ null, Validators.required ],
    mobileNumber: [ null, Validators.required ]
  });

  public isLoading: boolean = false;

  async ngOnInit(): Promise<void> { 
    this.navigationService.setTitle('Nueva empresa');
    this.navigationService.backTo();
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadSpinnerStart();
      this.companiesService.create(this.formGroup.value).subscribe(() => {
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.navigationService.showMessage('Registrado correctamente');
        this.router.navigate(['/companies']);
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }
  
}
