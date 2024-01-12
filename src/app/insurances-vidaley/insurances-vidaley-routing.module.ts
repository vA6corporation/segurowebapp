import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesVidaleyComponent } from './insurances-vidaley/insurances-vidaley.component';
import { CreateInsurancesVidaComponent } from '../insurances-vida/create-insurances-vida/create-insurances-vida.component';
import { EditInsurancesVidaleyComponent } from './edit-insurances-vidaley/edit-insurances-vidaley.component';
import { CreateInsurancesVidaleyWithInsuranceGroupComponent } from './create-insurances-vidaley-with-insurance-group/create-insurances-vidaley-with-insurance-group.component';


const routes: Routes = [
    { path: '', component: InsurancesVidaleyComponent},
    { path: 'create' , component: CreateInsurancesVidaComponent},
    { path: 'createWithInsuranceGroup', component: CreateInsurancesVidaleyWithInsuranceGroupComponent},
    { path: ':insuranceVidaleyId/edit', component: EditInsurancesVidaleyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesVidaleyRoutingModule { }
