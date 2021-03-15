import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinanciersComponent } from './financiers/financiers.component';
import { CreateFinanciersComponent } from './create-financiers/create-financiers.component';
import { EditFinanciersComponent } from './edit-financiers/edit-financiers.component';

const routes: Routes = [
  { path: '', component: FinanciersComponent },
  { path: 'create', component: CreateFinanciersComponent },
  { path: ':financierId/edit', component: EditFinanciersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanciersRoutingModule { }
