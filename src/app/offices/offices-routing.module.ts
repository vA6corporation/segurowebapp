import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOfficesComponent } from './create-offices/create-offices.component';
import { EditOfficesComponent } from './edit-offices/edit-offices.component';
import { OfficesComponent } from './offices/offices.component';

const routes: Routes = [
  { path: '', component: OfficesComponent },
  { path: 'create', component: CreateOfficesComponent },
  { path: ':officeId/edit', component: EditOfficesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficesRoutingModule { }
