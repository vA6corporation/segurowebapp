import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ShareholdersService } from '../shareholders.service';

@Component({
  selector: 'app-create-shareholders',
  templateUrl: './create-shareholders.component.html',
  styleUrls: ['./create-shareholders.component.sass']
})
export class CreateShareholdersComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly shareholdersService: ShareholdersService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    documentType: [ null, Validators.required ],
    document: [ null, Validators.required ],
    name: [ null, Validators.required ],
    email: [ null, [ Validators.required, Validators.email ] ],
    nationality: [ null, Validators.required ],
    percent: [ null, Validators.required ],
    mobileNumber: null,
    phoneNumber: null,
    annexed: null,
    birthDate: null,
    address: null,
  });

  public isLoading: boolean = false;
  public maxlength: number = 11;
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Nuevo accionista');
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
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      this.shareholdersService.create(this.formGroup.value).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.router.navigate(['/shareholders']);
        this.navigationService.showMessage('Registrador correctamente');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}