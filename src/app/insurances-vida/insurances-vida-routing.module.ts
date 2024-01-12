import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesVidaComponent } from './insurances-vida/insurances-vida.component';
import { CreateInsurancesVidaComponent } from './create-insurances-vida/create-insurances-vida.component';
import { CreateInsurancesVidaWithInsuranceGroupComponent } from './create-insurances-vida-with-insurance-group/create-insurances-vida-with-insurance-group.component';
import { EditInsurancesVidaComponent } from './edit-insurances-vida/edit-insurances-vida.component';

const routes: Routes = [
    { path: '', component: InsurancesVidaComponent },
    { path: 'createWithInsuranceGroup', component: CreateInsurancesVidaWithInsuranceGroupComponent },
    { path: 'create/:insuranceGroupId', component: CreateInsurancesVidaComponent },
    { path: ':insuranceVidaId/edit', component: EditInsurancesVidaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesVidaRoutingModule { }
