import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DisabledUsersComponent } from './disabled-users/disabled-users.component';
import { IndexUsersComponent } from './index-users/index-users.component';

@NgModule({
  declarations: [
    UsersComponent, 
    CreateUsersComponent, 
    EditUsersComponent, DisabledUsersComponent, IndexUsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class UsersModule { }
