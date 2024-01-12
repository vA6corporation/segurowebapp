import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesSctrComponent } from './insurances-sctr/insurances-sctr.component';
import { CreateInsurancesSctrComponent } from './create-insurances-sctr/create-insurances-sctr.component';
import { CreateInsurancesSctrWithInsuranceGroupComponent } from './create-insurances-sctr-with-insurance-group/create-insurances-sctr-with-insurance-group.component';
import { EditInsurancesSctrComponent } from './edit-insurances-sctr/edit-insurances-sctr.component';

const routes: Routes = [
    { path: '', component: InsurancesSctrComponent },
    { path: 'createWithInsuranceGroup', component: CreateInsurancesSctrWithInsuranceGroupComponent },
    { path: 'create/:insuranceGroupId', component: CreateInsurancesSctrComponent },
    { path: ':insuranceSctrId/edit', component: EditInsurancesSctrComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesSctrRoutingModule { }
