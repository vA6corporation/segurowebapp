import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BanksService } from '../banks.service';

@Component({
  selector: 'app-edit-banks',
  templateUrl: './edit-banks.component.html',
  styleUrls: ['./edit-banks.component.sass']
})
export class EditBanksComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly navigationService: NavigationService,
    private readonly banksService: BanksService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }
    
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    providerName: [ null, Validators.required ],
    bankName: 'BCP',
    accountNumber: [ null, Validators.required ],
    accountType: 'CORRIENTE',
    currencyCode: 'PEN'
  });

  public isLoading: boolean = false;
  private bankId: string = '';

  async ngOnInit(): Promise<void> { 
    this.navigationService.setTitle('Editar cuenta bancaria');
    this.activatedRoute.params.subscribe(params => {
      this.bankId = params.bankId;
      this.banksService.getBankById(this.bankId).subscribe(bank => {
        this.formGroup.patchValue(bank);
      });
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadSpinnerStart();
      this.banksService.update(this.formGroup.value, this.bankId).subscribe(bank => {
        console.log(bank);
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
