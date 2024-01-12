import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesEpsComponent } from './insurances-eps/insurances-eps.component';
import { CreateInsurancesEpsComponent } from './create-insurances-eps/create-insurances-eps.component';
import { CreateInsurancesEpsWithInsuranceGroupComponent } from './create-insurances-eps-with-insurance-group/create-insurances-eps-with-insurance-group.component';
import { EditInsurancesEpsComponent } from './edit-insurances-eps/edit-insurances-eps.component';

const routes: Routes = [
    { path: '', component: InsurancesEpsComponent },
    { path: 'createWithInsuranceGroup', component: CreateInsurancesEpsWithInsuranceGroupComponent },
    { path: 'create/:insuranceGroupId', component: CreateInsurancesEpsComponent },
    { path: ':insuranceEpsId/edit', component: EditInsurancesEpsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesEpsRoutingModule { }
