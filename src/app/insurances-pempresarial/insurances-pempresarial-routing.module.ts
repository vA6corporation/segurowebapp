import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesPempresarialComponent } from './insurances-pempresarial/insurances-pempresarial.component';
import { CreateInsurancesPempresarialComponent } from './create-insurances-pempresarial/create-insurances-pempresarial.component';
import { CreateInsurancesPempresarialWithInsuranceGroupComponent } from './create-insurances-pempresarial-with-insurance-group/create-insurances-pempresarial-with-insurance-group.component';
import { EditInsurancesPempresarialComponent } from './edit-insurances-pempresarial/edit-insurances-pempresarial.component';

const routes: Routes = [
    { path: '', component: InsurancesPempresarialComponent },
    { path: 'createWithInsuranceGroup', component: CreateInsurancesPempresarialWithInsuranceGroupComponent },
    { path: 'create/:insuranceGroupId', component: CreateInsurancesPempresarialComponent },
    { path: ':insurancePempresarialId/edit', component: EditInsurancesPempresarialComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesPempresarialRoutingModule { }
