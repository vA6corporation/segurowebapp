import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPrivilegesComponent } from './edit-privileges/edit-privileges.component';

const routes: Routes = [
  { path: ':userId/edit', component: EditPrivilegesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivilegesRoutingModule { }
