import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesPolizaearComponent } from './insurances-polizaear/insurances-polizaear.component';
import { CreateInsurancesPolizaearWithInsuranceGroupComponent } from './create-insurances-polizaear-with-insurance-group/create-insurances-polizaear-with-insurance-group.component';
import { CreateInsurancesPolizaearComponent } from './create-insurances-polizaear/create-insurances-polizaear.component';
import { EditInsurancesPolizaearComponent } from './edit-insurances-polizaear/edit-insurances-polizaear.component';

const routes: Routes = [
    { path: '', component: InsurancesPolizaearComponent },
    { path: 'createWithInsuranceGroup', component: CreateInsurancesPolizaearWithInsuranceGroupComponent },
    { path: 'create/:insuranceGroupId', component: CreateInsurancesPolizaearComponent },
    { path: ':insurancePolizaearId/edit', component: EditInsurancesPolizaearComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesPolizaearRoutingModule { }
