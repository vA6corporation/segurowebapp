import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    private readonly formBuilder: FormBuilder,
    private readonly usersService: UsersService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }
  
  public formGroup: FormGroup = this.formBuilder.group(this.authService.getObjectModules());
  public auth$: Subscription = new Subscription();
  public modules: ModuleModel[] = this.authService.getModules();
  public user: UserModel|null = null;
  public isLoading: boolean = false;
  private userId: string = '';

  ngOnDestroy() {
    this.auth$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.backTo();
    this.activatedRoute.params.subscribe(params => {
      this.userId = params.userId;
      this.usersService.getUserById(params.userId).subscribe(user => {
        this.navigationService.setTitle(`Permisos ${user.name}`);
        console.log(user);
        this.user = user;
        console.log(user.privileges);
        
        this.formGroup.patchValue(user.privileges || {});
      });
    });
  }

  onSubmit() {
    // this.user.privileges = this.formGroup.value;
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
    } else {
      
    }
  }

}
