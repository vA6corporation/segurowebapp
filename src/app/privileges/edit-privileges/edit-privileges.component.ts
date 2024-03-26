import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { UserModel } from 'src/app/users/user.model';
import { UsersService } from 'src/app/users/users.service';
import { ModuleModel } from '../module.model';
import { PrivilegesService } from '../privileges.service';

@Component({
    selector: 'app-edit-privileges',
    templateUrl: './edit-privileges.component.html',
    styleUrls: ['./edit-privileges.component.sass']
})
export class EditPrivilegesComponent implements OnInit {

    constructor(
        private readonly navigationService: NavigationService,
        private readonly privilegesService: PrivilegesService,
        private readonly authService: AuthService,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly usersService: UsersService,
        private readonly activatedRoute: ActivatedRoute,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group(this.authService.getObjectModules());
    auth$: Subscription = new Subscription();
    modules: ModuleModel[] = this.authService.getModules();
    user: UserModel | null = null;
    isLoading: boolean = false;
    private userId: string = '';

    ngOnDestroy() {
        this.auth$.unsubscribe();
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.userId = params.userId;
            this.usersService.getUserById(params.userId).subscribe(user => {
                this.navigationService.setTitle(`Permisos ${user.name}`);
                this.user = user;
                this.formGroup.patchValue(user.privileges || {});
            });
        });
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.privilegesService.update(this.formGroup.value, this.userId).subscribe(() => {
                this.navigationService.showMessage('Se han guardado los cambios');
                this.isLoading = false;
            }, (error: HttpErrorResponse) => {
                console.log(error);
                this.navigationService.showMessage(error.error.message);
                this.isLoading = false;
            });
        }
    }

}
