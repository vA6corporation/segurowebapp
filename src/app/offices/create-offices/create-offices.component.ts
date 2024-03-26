import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { OfficesService } from '../offices.service';

@Component({
    selector: 'app-create-offices',
    templateUrl: './create-offices.component.html',
    styleUrls: ['./create-offices.component.sass']
})
export class CreateOfficesComponent implements OnInit {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly officesService: OfficesService,
        private readonly navigationService: NavigationService,
        private readonly router: Router,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        name: [null, Validators.required],
        address: [null, Validators.required],
    });
    isLoading: boolean = false;
    maxlength: number = 11;

    ngOnInit(): void {
        this.navigationService.setTitle('Nueva oficina');
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadSpinnerStart();
            this.officesService.create(this.formGroup.value).subscribe(res => {
                console.log(res);
                this.isLoading = false;
                this.navigationService.loadSpinnerFinish();
                this.router.navigate(['/offices']);
                this.navigationService.showMessage('Registrado correctamente');
            }, (error: HttpErrorResponse) => {
                this.isLoading = false;
                this.navigationService.loadSpinnerFinish();
                this.navigationService.showMessage(error.error.message);
            });
        }
    }
}
