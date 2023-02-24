import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BeneficiariesService } from 'src/app/beneficiaries/beneficiaries.service';
import { BeneficiaryModel } from 'src/app/beneficiaries/beneficiary.model';
import { NavigationService } from 'src/app/navigation/navigation.service';

@Component({
  selector: 'app-dialog-beneficiaries',
  templateUrl: './dialog-beneficiaries.component.html',
  styleUrls: ['./dialog-beneficiaries.component.sass']
})
export class DialogBeneficiariesComponent implements OnInit {
  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly beneficiariesService: BeneficiariesService,
    private readonly navigationService: NavigationService,
  ) { }

  public formGroup: UntypedFormGroup = this.formBuilder.group({
    key: [ null, Validators.required ],
  });
  public beneficiaries: BeneficiaryModel[] = [];

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const key = this.formGroup.get('key')?.value;
      this.formGroup.reset();
      this.beneficiariesService.getBeneficiariesByKey(key).subscribe(beneficiaries => {
        this.navigationService.loadBarFinish();
        this.beneficiaries = beneficiaries;
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
