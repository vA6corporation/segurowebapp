import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { CreateBeneficiariesComponent } from './create-beneficiaries/create-beneficiaries.component';
import { EditBeneficiariesComponent } from './edit-beneficiaries/edit-beneficiaries.component';

const routes: Routes = [
  { path: '', component: BeneficiariesComponent },
  { path: 'create', component: CreateBeneficiariesComponent },
  { path: ':beneficiaryId/edit', component: EditBeneficiariesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficiariesRoutingModule { }
