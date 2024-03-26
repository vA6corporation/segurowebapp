import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ProvidersService } from '../providers.service';

@Component({
    selector: 'app-create-providers',
    templateUrl: './create-providers.component.html',
    styleUrls: ['./create-providers.component.sass']
})
export class CreateProvidersComponent implements OnInit {

    constructor(
        private readonly providersService: ProvidersService,
        private readonly navigationService: NavigationService,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly router: Router,
    ) { }

    formArray: UntypedFormArray = this.formBuilder.array([]);
    formGroup: UntypedFormGroup = this.formBuilder.group({
        documentType: ['DNI', Validators.required],
        document: null,
        name: [null, Validators.required],
        email: [null, [Validators.email]],
        mobileNumber: null,
        birthDate: null,
        address: null,
        banks: this.formArray,
    })

    isLoading: boolean = false;
    maxLength: number = 11;

    ngOnInit(): void {
        this.navigationService.setTitle('Nuevo proveedor');

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
            this.providersService.create(this.formGroup.value, this.formArray.value).subscribe(res => {
                console.log(res);
                this.isLoading = false;
                this.navigationService.loadSpinnerFinish();
                this.router.navigate(['/providers']);
                this.navigationService.showMessage('Registrado correctamente');
            }, (error: HttpErrorResponse) => {
                this.isLoading = false;
                this.navigationService.loadSpinnerFinish();
                this.navigationService.showMessage(error.error.message);
            });
        }
    }

}
