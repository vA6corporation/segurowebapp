import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTemplatePartnershipsComponent } from './create-template-partnerships/create-template-partnerships.component';
import { EditTemplatePartnershipsComponent } from './edit-template-partnerships/edit-template-partnerships.component';
import { TemplatePartnershipsComponent } from './template-partnerships/template-partnerships.component';

const routes: Routes = [
  { path: '', component: TemplatePartnershipsComponent },
  { path: 'create', component: CreateTemplatePartnershipsComponent },
  { path: ':partnershipId/edit', component: EditTemplatePartnershipsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatePartnershipsRoutingModule { }
