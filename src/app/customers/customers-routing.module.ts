import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerModelsComponent } from './customers/customers.component';
import { CreateCustomerModelsComponent } from './create-customers/create-customers.component';
import { EditCustomerModelsComponent } from './edit-customers/edit-customers.component';

const routes: Routes = [
  { path: '', component: CustomerModelsComponent },
  { path: 'create', component: CreateCustomerModelsComponent },
  { path: ':customerId/edit', component: EditCustomerModelsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerModelsRoutingModule { }
