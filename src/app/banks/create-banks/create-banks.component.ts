import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BanksService } from '../banks.service';

@Component({
    selector: 'app-create-banks',
    templateUrl: './create-banks.component.html',
    styleUrls: ['./create-banks.component.sass']
})
export class CreateBanksComponent implements OnInit {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly navigationService: NavigationService,
        private readonly banksService: BanksService,
        private readonly router: Router,
    ) { }

    public formGroup: UntypedFormGroup = this.formBuilder.group({
        providerName: [null, Validators.required],
        bankName: 'BCP',
        accountNumber: [null, Validators.required],
        accountType: 'CORRIENTE',
        currencyCode: 'PEN'
    });

    public isLoading: boolean = false;

    async ngOnInit(): Promise<void> {
        this.navigationService.setTitle('Nueva cuenta bancaria');
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadSpinnerStart();
            this.banksService.create(this.formGroup.value).subscribe(bank => {
                console.log(bank);
                this.isLoading = false;
                this.navigationService.loadSpinnerFinish();
                this.navigationService.showMessage('Registrado correctamente');
                this.router.navigate(['/banks']);
            }, (error: HttpErrorResponse) => {
                this.isLoading = false;
                this.navigationService.loadSpinnerFinish();
                this.navigationService.showMessage(error.error.message);
            });
        }
    }

}
