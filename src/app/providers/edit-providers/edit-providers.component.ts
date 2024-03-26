import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ProvidersService } from '../providers.service';

@Component({
    selector: 'app-edit-providers',
    templateUrl: './edit-providers.component.html',
    styleUrls: ['./edit-providers.component.sass']
})
export class EditProvidersComponent implements OnInit {

    constructor(
        private readonly providersService: ProvidersService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly formBuilder: UntypedFormBuilder,
    ) { }

    formArray: UntypedFormArray = this.formBuilder.array([]);
    formGroup: UntypedFormGroup = this.formBuilder.group({
        documentType: [null, Validators.required],
        document: null,
        name: [null, Validators.required],
        email: [null, [Validators.email]],
        mobileNumber: null,
        address: null,
        banks: this.formArray,
    })

    private providerId: string = '';
    isLoading: boolean = false;
    maxLength: number = 11;

    ngOnInit(): void {
        this.navigationService.setTitle('Editar proveedor');

        this.formGroup.get('documentType')?.valueChanges.subscribe(value => {
            switch (value) {
                case 'RUC':
                    this.formGroup.get('document')?.setValidators([Validators.required, Validators.minLength(11), Validators.maxLength(11)]);
                    this.maxLength = 11;
                    break;
                case 'DNI':
                    this.formGroup.get('document')?.setValidators([Validators.minLength(8), Validators.maxLength(8)]);
                    this.maxLength = 8;
                    break;
                default:
                    this.formGroup.get('document')?.setValidators([]);
                    this.maxLength = 24;
                    break;
            }
            this.formGroup.get('document')?.updateValueAndValidity();
        });

        this.activatedRoute.params.subscribe(params => {
            this.providerId = params.providerId;
            this.providersService.getProviderById(this.providerId).subscribe(provider => {
                console.log(provider);
                this.formGroup.patchValue(provider);
                for (const bank of provider.banks) {
                    const formBank = this.formBuilder.group({
                        bankName: bank.bankName,
                        accountNumber: [bank.accountNumber, Validators.required],
                    });
                    this.formArray.push(formBank);
                }
            });
        });
    }

    onAddAccount() {
        const formGroup = this.formBuilder.group({
            bankName: 'BCP',
            accountNumber: [null, Validators.required],
        });
        this.formArray.push(formGroup);
    }

    onRemoveAccount(index: number) {
        this.formArray.removeAt(index);
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadSpinnerStart();
            this.providersService.update(this.formGroup.value, this.formArray.value, this.providerId).subscribe(res => {
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
