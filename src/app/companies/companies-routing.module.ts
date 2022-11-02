import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { CreateCompaniesComponent } from './create-companies/create-companies.component';
import { EditCompaniesComponent } from './edit-companies/edit-companies.component';

const routes: Routes = [
  { path: '', component: CompaniesComponent },
  { path: 'create', component: CreateCompaniesComponent },
  { path: ':companyId/edit', component: EditCompaniesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
