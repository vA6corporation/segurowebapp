import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BeneficiariesService } from '../beneficiaries/beneficiaries.service';
import { Beneficiary } from '../beneficiaries/beneficiary.model';
import { NavigationService } from '../navigation/navigation.service';

@Component({
  selector: 'app-dialog-beneficiaries',
  templateUrl: './dialog-beneficiaries.component.html',
  styleUrls: ['./dialog-beneficiaries.component.sass']
})
export class DialogBeneficiariesComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private beneficiariesService: BeneficiariesService,
    private navigationService: NavigationService,
    private matSnackBar: MatSnackBar,
  ) {
    this.formGroup = this.formBuilder.group({
      key: [ null, Validators.required ],
    });
  }

  public beneficiaries: Beneficiary[] = [];
  public formGroup: FormGroup;

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const key = this.formGroup.get('key')?.value;
      this.formGroup.reset();
      this.beneficiariesService.getBeneficiariesByAny(key).subscribe(beneficiaries => {
        this.navigationService.loadBarFinish();
        this.beneficiaries = beneficiaries;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.matSnackBar.open(error.error.message, 'Aceptar', {
          duration: 5000
        });
      });
    }
  }

}
