import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LoadScreenService } from 'src/app/navigation/loadScreen.service';
import { FinanciersService } from '../financiers.service';

@Component({
  selector: 'app-edit-financiers',
  templateUrl: './edit-financiers.component.html',
  styleUrls: ['./edit-financiers.component.sass']
})
export class EditFinanciersComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private financiersService: FinanciersService,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private loadScreenService: LoadScreenService,
  ) {
    this.financierForm = this.formBuilder.group({
      ruc: [ null, Validators.required ],
      name: [ null, Validators.required ],
      email: [ null, [ Validators.required, Validators.email ] ],
      phoneNumber: [ null, [Validators.required, Validators.minLength(9)] ],
      businessId: [ null, Validators.required ],
    });

    this.activatedRoute.params.subscribe(async params => {
      this.financierId = params.financierId;
      this.financiersService.getFinancierById(this.financierId).subscribe(financier => {
        console.log(financier);
        this.financierForm.controls.ruc.setValue(financier.ruc);
        this.financierForm.controls.name.setValue(financier.name);
        this.financierForm.controls.email.setValue(financier.email);
        this.financierForm.controls.phoneNumber.setValue(financier.phoneNumber);
        this.financierForm.controls.businessId.setValue(financier.businessId);
      });
    });
  }
    
  public financierForm: FormGroup;
  private financierId: string = '';
  public isLoading: boolean = false;

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.financierForm.valid) {
      this.isLoading = true;
      this.loadScreenService.loadStart();
      this.financiersService.update(this.financierForm.value, this.financierId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.loadScreenService.loadFinish();
        this.matSnackBar.open('Se han guardado los cambios', 'Aceptar', {
          duration: 5000,
        });
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.loadScreenService.loadFinish();
        this.matSnackBar.open(error.error.message, 'Aceptar', {
          duration: 5000,
        });
      });
    }
  }
}
