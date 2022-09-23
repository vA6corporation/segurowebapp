import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateInsuranceBusinessesComponent } from './create-insurance-businesses/create-insurance-businesses.component';
import { EditInsuranceBusinessesComponent } from './edit-insurance-businesses/edit-insurance-businesses.component';
import { InsuranceBusinessesComponent } from './insurance-businesses/insurance-businesses.component';

const routes: Routes = [
  { path: '', component: InsuranceBusinessesComponent },
  { path: ':businessId/edit', component: EditInsuranceBusinessesComponent },
  { path: 'create', component: CreateInsuranceBusinessesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceBusinessesRoutingModule { }
