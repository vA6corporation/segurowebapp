import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BeneficiariesService } from '../beneficiaries.service';

@Component({
    selector: 'app-create-beneficiaries',
    templateUrl: './create-beneficiaries.component.html',
    styleUrls: ['./create-beneficiaries.component.sass']
})
export class CreateBeneficiariesComponent implements OnInit {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly beneficiariesService: BeneficiariesService,
        private readonly navigationService: NavigationService,
        private readonly router: Router,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        document: ['', Validators.required],
        name: ['', Validators.required],
        email: '',
        mobileNumber: '',
        phoneNumber: '',
        annexed: '',
        address: '',
        legalRepresentative: '',
        positionLegalRepresentative: '',
        contactPerson: '',
        positioncontactPerson: '',
        economicActivity: '',
    });
    isLoading: boolean = false;
    maxlength: number = 11;

    ngOnInit(): void {
        this.navigationService.setTitle('Nuevo beneficiario');
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadBarStart();
            this.beneficiariesService.create(this.formGroup.value).subscribe(res => {
                console.log(res);
                this.isLoading = false;
                this.navigationService.loadBarFinish();
                this.router.navigate(['/beneficiaries']);
                this.navigationService.showMessage('Registrado correctamente');
            }, (error: HttpErrorResponse) => {
                this.isLoading = false;
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage(error.error.message);
            });
        }
    }

}
