import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateInsurancePartnershipsComponent } from './create-insurance-partnerships/create-insurance-partnerships.component';
import { EditInsurancePartnershipsComponent } from './edit-insurance-partnerships/edit-insurance-partnerships.component';
import { InsurancePartnershipsComponent } from './insurance-partnerships/insurance-partnerships.component';

const routes: Routes = [
  { path: '', component: InsurancePartnershipsComponent },
  { path: ':partnershipId/edit', component: EditInsurancePartnershipsComponent },
  { path: 'create', component: CreateInsurancePartnershipsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancePartnershipsRoutingModule { }
