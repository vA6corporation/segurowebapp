import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinanciersComponent } from './financiers/financiers.component';
import { CreateFinanciersComponent } from './create-financiers/create-financiers.component';
import { EditFinanciersComponent } from './edit-financiers/edit-financiers.component';

const routes: Routes = [
  { path: 'financiers', component: FinanciersComponent },
  { path: 'financiers/create', component: CreateFinanciersComponent },
  { path: 'financiers/:financierId/edit', component: EditFinanciersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanciersRoutingModule { }
