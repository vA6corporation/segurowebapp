import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BeneficiariesService } from '../beneficiaries.service';

@Component({
  selector: 'app-edit-beneficiaries',
  templateUrl: './edit-beneficiaries.component.html',
  styleUrls: ['./edit-beneficiaries.component.sass']
})
export class EditBeneficiariesComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly beneficiariesService: BeneficiariesService,
    private readonly navigationService: NavigationService,
    private readonly route: ActivatedRoute,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    beneficiary: this.formBuilder.group({
      _id: [ null ],
      document: [ null, Validators.required ],
      name: [ null, Validators.required ],
      email: [ null, Validators.email ],
      mobileNumber: null,
      phoneNumber: null,
      annexed: null,
      address: null,
    }),
  });

  public isLoading: boolean = false;
  public maxlength: number = 11;
  private beneficiaryId: string = '';
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Editar beneficiario');
    this.navigationService.backTo();

    this.route.params.subscribe(params => {
      this.beneficiaryId = params.beneficiaryId;
      this.beneficiariesService.getBeneficiaryById(this.beneficiaryId).subscribe(beneficiary => {
        console.log(beneficiary);
        this.formGroup.get('beneficiary')?.setValue(beneficiary);
      });
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { beneficiary } = this.formGroup.value;
      this.beneficiariesService.update(beneficiary, this.beneficiaryId).subscribe(res => {
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
