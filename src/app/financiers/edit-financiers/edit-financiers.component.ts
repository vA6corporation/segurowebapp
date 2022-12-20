import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { FinancierModelsService } from '../financiers.service';

@Component({
  selector: 'app-edit-financiers',
  templateUrl: './edit-financiers.component.html',
  styleUrls: ['./edit-financiers.component.sass']
})
export class EditFinancierModelsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly financiersService: FinancierModelsService,
    private readonly navigationService: NavigationService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    document: [ null, Validators.required ],
    name: [ null, Validators.required ],
    email: [ null, [ Validators.required, Validators.email ] ],
    mobileNumber: null,
    phoneNumber: null,
    annexed: null,
    emitionYearlyRatePercentage: [ null, Validators.required ],
    emitionPrimaPercentage: [ null, Validators.required ],
    emitionLawPercentage: [ null, Validators.required ],
    emitionCharge: [ null, Validators.required ],
    renewalYearlyRatePercentage: [ null, Validators.required ],
    renewalPrimaPercentage: [ null, Validators.required ],
    renewalLawPercentage: [ null, Validators.required ],
    renewalCharge: [ null, Validators.required ],
  });

  private financierId: string = '';
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.navigationService.setTitle('Editar financiera');
    this.navigationService.backTo();
    this.activatedRoute.params.subscribe(async params => {
      this.financierId = params.financierId;
      this.financiersService.getFinancierModelById(this.financierId).subscribe(financier => {
        this.formGroup.patchValue(financier);
      });
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      this.financiersService.update(this.formGroup.value, this.financierId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }
}
