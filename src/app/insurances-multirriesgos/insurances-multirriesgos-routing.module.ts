import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesMultirriesgosComponent } from './insurances-multirriesgos/insurances-multirriesgos.component';
import { CreateInsurancesMultirriesgosWithInsuranceGroupComponent } from './create-insurances-multirriesgos-with-insurance-group/create-insurances-multirriesgos-with-insurance-group.component';
import { CreateInsurancesMultirriesgosComponent } from './create-insurances-multirriesgos/create-insurances-multirriesgos.component';
import { EditInsurancesMultirriesgosComponent } from './edit-insurances-multirriesgos/edit-insurances-multirriesgos.component';


const routes: Routes = [
    { path: '', component: InsurancesMultirriesgosComponent },
    { path: 'createWithInsuranceGroup', component: CreateInsurancesMultirriesgosWithInsuranceGroupComponent },
    { path: 'create/:insuranceGroupId', component: CreateInsurancesMultirriesgosComponent },
    { path: ':insuranceMultirriesgosId/edit', component: EditInsurancesMultirriesgosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesMultirriesgosRoutingModule { }
