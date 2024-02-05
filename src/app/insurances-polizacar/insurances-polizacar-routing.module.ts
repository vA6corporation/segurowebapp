import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesPolizacarComponent } from './insurances-polizacar/insurances-polizacar.component';
import { CreateInsurancesPolizacarComponent } from './create-insurances-polizacar/create-insurances-polizacar.component';
import { CreateInsurancesPolizacarWithInsuranceGroupComponent } from './create-insurances-polizacar-with-insurance-group/create-insurances-polizacar-with-insurance-group.component';
import { EditInsurancesPolizacarComponent } from './edit-insurances-polizacar/edit-insurances-polizacar.component';

const routes: Routes = [
    { path: '', component: InsurancesPolizacarComponent },
    { path: 'createWithInsuranceGroup', component: CreateInsurancesPolizacarWithInsuranceGroupComponent },
    { path: 'create/:insuranceGroupId', component: CreateInsurancesPolizacarComponent },
    { path: ':insurancePolizacarId/edit', component: EditInsurancesPolizacarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesPolizacarRoutingModule { }
