import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesVehicularComponent } from './insurances-vehicular/insurances-vehicular.component';
import { CreateInsurancesVehicularComponent } from './create-insurances-vehicular/create-insurances-vehicular.component';
import { CreateInsurancesVehicularWithInsuranceGroupComponent } from './create-insurances-vehicular-with-insurance-group/create-insurances-vehicular-with-insurance-group.component';
import { EditInsurancesVehicularComponent } from './edit-insurances-vehicular/edit-insurances-vehicular.component';

const routes: Routes = [
    { path: '', component: InsurancesVehicularComponent },
    { path: 'createWithInsuranceGroup', component: CreateInsurancesVehicularWithInsuranceGroupComponent },
    { path: 'create/:insuranceGroupId', component: CreateInsurancesVehicularComponent },
    { path: ':insuranceVehicularId/edit', component: EditInsurancesVehicularComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsurancesVehicularRoutingModule { }
