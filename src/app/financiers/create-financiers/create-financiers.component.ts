import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoadScreenService } from 'src/app/navigation/loadScreen.service';
import { FinanciersService } from '../financiers.service';

@Component({
  selector: 'app-create-financiers',
  templateUrl: './create-financiers.component.html',
  styleUrls: ['./create-financiers.component.sass']
})
export class CreateFinanciersComponent implements OnInit {

  constructor(
    private financiersService: FinanciersService,
    private loadScreenService: LoadScreenService,
    private router: Router,
    private matSnackBar: MatSnackBar,
  ) {
    this.financierForm = this.formBuilder.group({
      ruc: [ null, [ Validators.required, Validators.minLength(11), Validators.maxLength(11) ] ],
      name: [ null, Validators.required ],
      email: [ null, [ Validators.required, Validators.email ] ],
      phoneNumber: [ null, [ Validators.required, Validators.minLength(12) ] ],
    });
  }
    
  private formBuilder: FormBuilder = new FormBuilder();
  public financierForm: FormGroup;
  public isLoading: boolean = false;

  ngOnInit(): void {}

  async onSubmit() {
    if (this.financierForm.valid) {
      this.isLoading = true;
      this.loadScreenService.loadStart();
      this.financiersService.create(this.financierForm.value).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.loadScreenService.loadFinish();
        this.router.navigate(['/financiers']);
        this.matSnackBar.open('Financiera registrada correctamente', 'Aceptar', {
          duration: 5000
        });
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.loadScreenService.loadFinish();
        this.matSnackBar.open(error.error.message, 'Aceptar', {
          duration: 5000
        });
      });
    }
  }
}
