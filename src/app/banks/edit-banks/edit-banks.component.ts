import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BanksService } from '../banks.service';

@Component({
  selector: 'app-edit-banks',
  templateUrl: './edit-banks.component.html',
  styleUrls: ['./edit-banks.component.sass']
})
export class EditBanksComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly navigationService: NavigationService,
    private readonly banksService: BanksService,
    private readonly route: ActivatedRoute,
    // private readonly router: Router,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    providerName: [ null, Validators.required ],
    bankName: 'BCP',
    accountNumber: [ null, Validators.required ],
  });

  public isLoading: boolean = false;
  private bankId: string = '';

  async ngOnInit(): Promise<void> { 
    this.navigationService.setTitle('Editar cuenta bancaria');
    this.navigationService.backTo();

    this.route.params.subscribe(params => {
      this.bankId = params.bankId;

      this.banksService.getBankById(this.bankId).subscribe(bank => {
        console.log(bank);
        
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
        // this.router.navigate(['/banks']);
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadSpinnerFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
