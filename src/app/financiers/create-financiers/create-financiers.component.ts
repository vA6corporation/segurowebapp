import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { FinanciersService } from '../financiers.service';

@Component({
  selector: 'app-create-financiers',
  templateUrl: './create-financiers.component.html',
  styleUrls: ['./create-financiers.component.sass']
})
export class CreateFinanciersComponent implements OnInit {

  constructor(
    private financiersService: FinanciersService,
    private navigationService: NavigationService,
    private router: Router,
  ) { }
    
  private formBuilder: FormBuilder = new FormBuilder();
  public isLoading: boolean = false;
  public financierForm: FormGroup = this.formBuilder.group({
    document: [ null, [ Validators.required, Validators.minLength(11), Validators.maxLength(11) ] ],
    name: [ null, Validators.required ],
    email: [ null, [ Validators.required, Validators.email ] ],
    mobileNumber: null,
    phoneNumber: null,
    annexed: null,
  });

  ngOnInit(): void {}

  async onSubmit() {
    if (this.financierForm.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      this.financiersService.create(this.financierForm.value).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.router.navigate(['/financiers']);
        this.navigationService.showMessage('Registrado correctamente');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }
}
