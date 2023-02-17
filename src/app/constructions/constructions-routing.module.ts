import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConstructionsCommercialComponent } from './constructions-commercial/constructions-commercial.component';
import { ConstructionsComponent } from './constructions/constructions.component';
import { CreateConstructionsComponent } from './create-constructions/create-constructions.component';
import { DebtorsComponent } from './debtors/debtors.component';
import { EditConstructionsComponent } from './edit-constructions/edit-constructions.component';
import { LessConstructionsComponent } from './less-constructions/less-constructions.component';
import { PercentCompletionsComponent } from './percent-completions/percent-completions.component';
import { UpdatePercentCompletionsComponent } from './update-percent-completions/update-percent-completions.component';
import { WithoutDocumentationComponent } from './without-documentation/without-documentation.component';

const routes: Routes = [
  { path: '', component: ConstructionsComponent },
  { path: 'commercial', component: ConstructionsCommercialComponent },
  { path: 'debtors', component: DebtorsComponent },
  { path: 'percentCompletions', component: PercentCompletionsComponent },
  { path: 'updatePercentCompletions', component: UpdatePercentCompletionsComponent },
  { path: 'create', component: CreateConstructionsComponent },
  { path: ':constructionId/edit', component: EditConstructionsComponent },
  { path: 'less', component: LessConstructionsComponent },
  { path: 'withoutDocumentation', component: WithoutDocumentationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConstructionsRoutingModule { }
