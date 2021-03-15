import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
    private formBuilder: FormBuilder,
    private beneficiariesService: BeneficiariesService,
    private matSnackBar: MatSnackBar,
    private navigationService: NavigationService,
    private activatedRoute: ActivatedRoute,
    public matDialog: MatDialog,
  ) {
    this.formGroup = this.formBuilder.group({
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

    this.activatedRoute.params.subscribe(params => {
      this.beneficiaryId = params.beneficiaryId;
      this.beneficiariesService.getBeneficiaryById(this.beneficiaryId).subscribe(beneficiary => {
        console.log(beneficiary);
        this.formGroup.get('beneficiary')?.setValue(beneficiary);
      });
    });
  }
    
  public formGroup: FormGroup;
  public isLoading: boolean = false;
  public maxlength: number = 11;
  private beneficiaryId: string = '';
  
  ngOnInit(): void { }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadSpinnerStart();
      const { beneficiary } = this.formGroup.value;
      this.beneficiariesService.update(beneficiary, this.beneficiaryId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.matSnackBar.open('Se han guardado los cambios', 'Aceptar', {
          duration: 5000,
        });
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.matSnackBar.open(error.error.message, 'Aceptar', {
          duration: 5000,
        });
      });
    }
  }
  
}
