import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinancierModelsComponent } from './financiers/financiers.component';
import { CreateFinancierModelsComponent } from './create-financiers/create-financiers.component';
import { EditFinancierModelsComponent } from './edit-financiers/edit-financiers.component';

const routes: Routes = [
  { path: '', component: FinancierModelsComponent },
  { path: 'create', component: CreateFinancierModelsComponent },
  { path: ':financierId/edit', component: EditFinancierModelsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancierModelsRoutingModule { }
