import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateInsuranceConstructionsComponent } from './create-insurance-constructions/create-insurance-constructions.component';
import { EditInsuranceConstructionsComponent } from './edit-insurance-constructions/edit-insurance-constructions.component';
import { InsuranceConstructionsComponent } from './insurance-constructions/insurance-constructions.component';

const routes: Routes = [
  { path: '', component: InsuranceConstructionsComponent },
  { path: 'create', component: CreateInsuranceConstructionsComponent },
  { path: ':constructionId/edit', component: EditInsuranceConstructionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceConstructionsRoutingModule { }
