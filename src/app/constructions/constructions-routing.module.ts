import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConstructionsComponent } from './constructions/constructions.component';
import { CreateConstructionsComponent } from './create-constructions/create-constructions.component';
import { EditConstructionsComponent } from './edit-constructions/edit-constructions.component';
import { LessConstructionsComponent } from './less-constructions/less-constructions.component';
import { WithoutDocumentationComponent } from './without-documentation/without-documentation.component';

const routes: Routes = [
  { path: '', component: ConstructionsComponent },
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
