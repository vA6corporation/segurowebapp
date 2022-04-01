import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrokersComponent } from './brokers/brokers.component';
import { CreateBrokersComponent } from './create-brokers/create-brokers.component';
import { EditBrokersComponent } from './edit-brokers/edit-brokers.component';

const routes: Routes = [
  { path: '', component: BrokersComponent },
  { path: ':brokerId/edit', component: EditBrokersComponent },
  { path: 'create', component: CreateBrokersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokersRoutingModule { }
