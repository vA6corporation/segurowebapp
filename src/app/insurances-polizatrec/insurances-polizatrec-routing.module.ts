import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesPolizatrecComponent } from './insurances-polizatrec/insurances-polizatrec.component';
import { CreateInsurancesPolizatrecComponent } from './create-insurances-polizatrec/create-insurances-polizatrec.component';
import { CreateInsurancesPolizatrecWithInsuranceGroupComponent } from './create-insurances-polizatrec-with-insurance-group/create-insurances-polizatrec-with-insurance-group.component';
import { EditInsurancesPolizatrecComponent } from './edit-insurances-polizatrec/edit-insurances-polizatrec.component';

const routes: Routes = [
    { path: '', component: InsurancesPolizatrecComponent },
    { path: 'create', component: CreateInsurancesPolizatrecComponent},
    { path: 'createWithInsuranceGroup', component: CreateInsurancesPolizatrecWithInsuranceGroupComponent },
    { path: ':insurancePolizatrecId/edit', component: EditInsurancesPolizatrecComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesPolizatrecRoutingModule { }
