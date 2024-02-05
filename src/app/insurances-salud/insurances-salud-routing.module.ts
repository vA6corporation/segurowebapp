import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesSaludComponent } from './insurances-salud/insurances-salud.component';
import { CreateInsurancesSaludComponent } from './create-insurances-salud/create-insurances-salud.component';
import { CreateInsurancesSaludWithInsuranceGroupComponent } from './create-insurances-salud-with-insurance-group/create-insurances-salud-with-insurance-group.component';
import { EditInsurancesSaludComponent } from './edit-insurances-salud/edit-insurances-salud.component';

const routes: Routes = [
    { path: '', component: InsurancesSaludComponent },
    { path: 'createWithInsuranceGroup', component: CreateInsurancesSaludWithInsuranceGroupComponent },
    { path: 'create/:insuranceGroupId', component: CreateInsurancesSaludComponent },
    { path: ':insuranceSaludId/edit', component: EditInsurancesSaludComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesSaludRoutingModule { }
