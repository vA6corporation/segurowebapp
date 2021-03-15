import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Financier } from 'src/app/financiers/financier.model';
import { FinanciersService } from 'src/app/financiers/financiers.service';
import { NavigationService } from '../navigation/navigation.service';

@Component({
  selector: 'app-dialog-financiers',
  templateUrl: './dialog-financiers.component.html',
  styleUrls: ['./dialog-financiers.component.sass']
})
export class DialogFinanciersComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private financiersService: FinanciersService,
    private navigationService: NavigationService,
    private matSnackBar: MatSnackBar,
  ) { 
    this.formGroup = this.formBuilder.group({
      key: [ null, Validators.required ],
    })
  }

  public financiers: Financier[] = [];
  public formGroup: FormGroup;

  ngOnInit(): void { }
  
  onSubmit(): void {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const key = this.formGroup.get('key')?.value;
      this.formGroup.get('key')?.setValue(null);
      this.financiersService.getFinanciersByAny(key).subscribe(financiers => {
        this.navigationService.loadBarFinish();
        this.financiers = financiers;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.matSnackBar.open(error.error.message, 'Aceptar', {
          duration: 5000
        });
      });
    }
  }

}
