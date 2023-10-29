import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUsersComponent } from './create-users/create-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { IndexUsersComponent } from './index-users/index-users.component';

const routes: Routes = [
  { path: '', component: IndexUsersComponent },
  { path: 'create', component: CreateUsersComponent },
  { path: ':userId/edit', component: EditUsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
