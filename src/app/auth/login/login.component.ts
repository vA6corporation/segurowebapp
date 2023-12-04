import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { RememberUsersDb } from '../rememberUsers.db';
import { RememberUserModel } from '../remember-user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService, 
    private readonly formBuilder: UntypedFormBuilder,
    private readonly rememberUsersDb: RememberUsersDb,
    private readonly navigationService: NavigationService,
  ) { }
  
  public loginForm: UntypedFormGroup = this.formBuilder.group({
    email: [ '', [Validators.required, Validators.email] ],
    password: [ '', [Validators.required, Validators.minLength(3)] ],
    rememberme: false,
  });
  private count = 0;
  public hide: boolean = true;

  public version: string = environment.version;
  public isLoading: boolean = false;
  public newLogin: boolean = false;
  public rememberUsers: RememberUserModel[] = [];

  ngOnInit(): void { 
    this.navigationService.setTitle('Fidenza');
    this.rememberUsersDb.loadDb().then(async () => {
      this.rememberUsers = await this.rememberUsersDb.loadRememberUsers();
    });
  }

  onDeleteUser(userId: string, event: MouseEvent) {
    event.stopPropagation();
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      this.rememberUsersDb.onDeleteRememberUser(userId).then(async () => {
        this.rememberUsers = await this.rememberUsersDb.loadRememberUsers();
      })
    }
  }

  onUserSelected(user: RememberUserModel) {
    this.loginForm.patchValue(user);
    this.onSubmit();
  }

  onDeploy() {
    if (this.count >= 5) {
      this.router.navigate(['signup']);
    }
    this.count += 1;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { email, password, rememberme } = this.loginForm.value;
      this.authService.login(email, password).subscribe(res => {
        this.navigationService.loadBarFinish()
        const { accessToken, user } = res;
        if (rememberme) {
          const rememberUser: RememberUserModel = {
            ...user,
            password,
          }
          this.rememberUsersDb.onUpdateRememberUser(rememberUser)
        }
        this.isLoading = false;
        this.authService.setAccessToken(accessToken);
        this.router.navigate(['/setOffice'])
        // location.reload();
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Usuario o contraseña incorrectos');
      });
    }
  }
}
