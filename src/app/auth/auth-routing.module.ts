import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetOfficeComponent } from '../offices/set-office/set-office.component';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { DeviceComponent } from './device/device.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'device', component: DeviceComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'setOffice', component: SetOfficeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
