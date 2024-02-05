import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesRcivilComponent } from './insurances-rcivil/insurances-rcivil.component';
import { CreateInsurancesRcivilComponent } from './create-insurances-rcivil/create-insurances-rcivil.component';
import { CreateInsurancesRcivilWithInsuranceGroupComponent } from './create-insurances-rcivil-with-insurance-group/create-insurances-rcivil-with-insurance-group.component';
import { EditInsurancesRcivilComponent } from './edit-insurances-rcivil/edit-insurances-rcivil.component';

const routes: Routes = [
    { path: '', component: InsurancesRcivilComponent },
    { path: 'create', component: CreateInsurancesRcivilComponent},
    { path: 'createWithInsuranceGroup', component: CreateInsurancesRcivilWithInsuranceGroupComponent },
    { path: ':insuranceRcivilId/edit', component: EditInsurancesRcivilComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesRcivilRoutingModule { }
