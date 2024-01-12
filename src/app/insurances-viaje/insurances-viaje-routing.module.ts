import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesViajeComponent } from './insurances-viaje/insurances-viaje.component';
import { CreateInsurancesViajeComponent } from './create-insurances-viaje/create-insurances-viaje.component';
import { CreateInsurancesViajeWithInsuranceGroupComponent } from './create-insurances-viaje-with-insurance-group/create-insurances-viaje-with-insurance-group.component';
import { EditInsurancesViajeComponent } from './edit-insurances-viaje/edit-insurances-viaje.component';

const routes: Routes = [
    { path: '', component: InsurancesViajeComponent },
    { path: 'createWithInsuranceGroup', component: CreateInsurancesViajeWithInsuranceGroupComponent },
    { path: 'create/:insuranceGroupId', component: CreateInsurancesViajeComponent },
    { path: ':insuranceViajeId/edit', component: EditInsurancesViajeComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesViajeRoutingModule { }
