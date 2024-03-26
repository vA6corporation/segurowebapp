import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
        private readonly formBuilder: UntypedFormBuilder,
        private readonly beneficiariesService: BeneficiariesService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        document: ['', Validators.required],
        name: ['', Validators.required],
        email: ['', Validators.email],
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
    private beneficiaryId: string = '';

    ngOnInit(): void {
        this.navigationService.setTitle('Editar beneficiario');
        this.activatedRoute.params.subscribe(params => {
            this.beneficiaryId = params.beneficiaryId;
            this.beneficiariesService.getBeneficiaryById(this.beneficiaryId).subscribe(beneficiary => {
                this.formGroup.patchValue(beneficiary);
            });
        });
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadBarStart();
            this.beneficiariesService.update(this.formGroup.value, this.beneficiaryId).subscribe(res => {
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
