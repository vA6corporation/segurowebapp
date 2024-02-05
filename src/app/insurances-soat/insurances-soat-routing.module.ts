import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesSoatComponent } from './insurances-soat/insurances-soat.component';
import { CreateInsurancesSoatComponent } from './create-insurances-soat/create-insurances-soat.component';
import { EditInsurancesSoatComponent } from './edit-insurances-soat/edit-insurances-soat.component';
import { CreateInsurancesSoatWithInsuranceGroupComponent } from './create-insurances-soat-with-insurance-group/create-insurances-soat-with-insurance-group.component';

const routes: Routes = [
    { path: '', component: InsurancesSoatComponent },
    { path: 'create', component: CreateInsurancesSoatComponent},
    { path: 'createWithInsuranceGroup', component: CreateInsurancesSoatWithInsuranceGroupComponent },
    { path: ':insuranceSoatId/edit', component: EditInsurancesSoatComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesSoatRoutingModule { }
