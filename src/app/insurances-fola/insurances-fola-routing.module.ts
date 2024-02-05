import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesFolaComponent } from './insurances-fola/insurances-fola.component';
import { CreateInsurancesFolaComponent } from './create-insurances-fola/create-insurances-fola.component';
import { CreateInsurancesFolaWithInsuranceGroupComponent } from './create-insurances-fola-with-insurance-group/create-insurances-fola-with-insurance-group.component';
import { EditInsurancesFolaComponent } from './edit-insurances-fola/edit-insurances-fola.component';


const routes: Routes = [
    { path: '', component: InsurancesFolaComponent },
    { path: 'createWithInsuranceGroup', component: CreateInsurancesFolaWithInsuranceGroupComponent },
    { path: 'create/:insuranceGroupId', component: CreateInsurancesFolaComponent },
    { path: ':insuranceFolaId/edit', component: EditInsurancesFolaComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InsurancesFolaRoutingModule { }
