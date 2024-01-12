import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesAccidentesComponent } from './insurances-accidentes/insurances-accidentes.component';
import { CreateInsurancesAccidentesComponent } from './create-insurances-accidentes/create-insurances-accidentes.component';
import { CreateInsurancesAccidentesWithInsuranceGroupComponent } from './create-insurances-accidentes-with-insurance-group/create-insurances-accidentes-with-insurance-group.component';
import { EditInsurancesAccidentesComponent } from './edit-insurances-accidentes/edit-insurances-accidentes.component';

const routes: Routes = [
    { path: '', component: InsurancesAccidentesComponent },
    { path: 'createWithInsuranceGroup', component: CreateInsurancesAccidentesWithInsuranceGroupComponent },
    { path: 'create/:insuranceGroupId', component: CreateInsurancesAccidentesComponent },
    { path: ':insuranceAccidentesId/edit', component: EditInsurancesAccidentesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesAccidentesRoutingModule { }
