import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { OfficesService } from '../offices.service';

@Component({
  selector: 'app-create-offices',
  templateUrl: './create-offices.component.html',
  styleUrls: ['./create-offices.component.sass']
})
export class CreateOfficesComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly officesService: OfficesService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    name: [ null, Validators.required ],
    address: [ null, Validators.required ],
  });
  public isLoading: boolean = false;
  public maxlength: number = 11;
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Nueva oficina');
    this.navigationService.backTo();
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadSpinnerStart();
      this.officesService.create(this.formGroup.value).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.router.navigate(['/offices']);
        this.navigationService.showMessage('Registrado correctamente');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }
}
