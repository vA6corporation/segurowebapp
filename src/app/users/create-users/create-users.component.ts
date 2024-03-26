import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { UsersService } from '../users.service';
import { OfficesService } from 'src/app/offices/offices.service';
import { OfficeModel } from 'src/app/auth/office.model';

@Component({
    selector: 'app-create-users',
    templateUrl: './create-users.component.html',
    styleUrls: ['./create-users.component.sass']
})
export class CreateUsersComponent implements OnInit {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly usersService: UsersService,
        private readonly navigationService: NavigationService,
        private readonly officesService: OfficesService,
        private readonly router: Router,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        name: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, Validators.required],
        assignedOfficeId: null,
    });
    isLoading: boolean = false;
    hide: boolean = true;
    offices: OfficeModel[] = [];

    ngOnInit(): void {
        this.navigationService.setTitle('Nuevo usuario');

        this.officesService.getOffices().subscribe(offices => {
            this.offices = offices;
        });
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadBarStart();
            this.usersService.create(this.formGroup.value).subscribe(res => {
                console.log(res);
                this.isLoading = false;
                this.navigationService.loadBarFinish();
                this.router.navigate(['/users']);
                this.navigationService.showMessage('Registrado correctamente');
            }, (error: HttpErrorResponse) => {
                console.log(error);
                this.isLoading = false;
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage(error.error.message);
            });
        }
    }
}
