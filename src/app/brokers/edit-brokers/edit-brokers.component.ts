import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BrokersService } from '../brokers.service';

@Component({
  selector: 'app-edit-brokers',
  templateUrl: './edit-brokers.component.html',
  styleUrls: ['./edit-brokers.component.sass']
})
export class EditBrokersComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly brokersService: BrokersService,
    private readonly navigationService: NavigationService,
    private readonly route: ActivatedRoute,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    typeDocument: [ null, Validators.required ],
    document: [ null, Validators.required ],
    name: [ null, Validators.required ],
    email: [ null, [ Validators.required, Validators.email ] ],
    mobileNumber: null,
    phoneNumber: null,
    annexed: null,
  });
  private brokerId: string = '';

  public isLoading: boolean = false;
  public maxlength: number = 11;
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Editar broker');

    this.route.params.subscribe(params => {
      this.brokerId = params.brokerId;
      this.brokersService.getBrokerById(this.brokerId).subscribe(broker => {
        this.formGroup.patchValue(broker);
      });
    });

    this.formGroup.get('typeDocument')?.valueChanges.subscribe(value => {
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
      this.brokersService.update(this.formGroup.value, this.brokerId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        // this.router.navigate(['/brokers']);
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
