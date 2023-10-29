import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { CertifiersService } from '../certifiers.service';

@Component({
  selector: 'app-create-certifiers',
  templateUrl: './create-certifiers.component.html',
  styleUrls: ['./create-certifiers.component.sass']
})
export class CreateCertifiersComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly navigationService: NavigationService,
    private readonly certifiersService: CertifiersService,
    private readonly router: Router,
  ) { }
    
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    name: [ null, Validators.required ],
    email: [ null, Validators.required ],
  });

  public isLoading: boolean = false;

  ngOnInit() { 
    this.navigationService.setTitle('Nueva certificadora');
    this.navigationService.backTo();
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadSpinnerStart();
      this.certifiersService.create(this.formGroup.value).subscribe(certifier => {
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.certifiersService.loadCertifiers();
        this.navigationService.showMessage('Registrado correctamente');
        this.router.navigate(['/certifiers']);
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }
}
