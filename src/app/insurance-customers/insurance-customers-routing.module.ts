import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateInsuranceCustomersComponent } from './create-insurance-customers/create-insurance-customers.component';
import { EditInsuranceCustomersComponent } from './edit-insurance-customers/edit-insurance-customers.component';
import { InsuranceCustomersComponent } from './insurance-customers/insurance-customers.component';

const routes: Routes = [
  { path: '', component: InsuranceCustomersComponent },
  { path: ':customerId/edit', component: EditInsuranceCustomersComponent },
  { path: 'create', component: CreateInsuranceCustomersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceCustomersRoutingModule { }
