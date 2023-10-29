import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessesCommercialComponent } from './businesses-commercial/businesses-commercial.component';
import { BusinessesComponent } from './businesses/businesses.component';
import { CreateBusinessesComponent } from './create-businesses/create-businesses.component';
import { EditBusinessesComponent } from './edit-businesses/edit-businesses.component';
import { WithoutDocumentationComponent } from './without-documentation/without-documentation.component';

const routes: Routes = [
  { path: '', component: BusinessesComponent },
  { path: 'commercial', component: BusinessesCommercialComponent },
  { path: 'withoutDocumentation', component: WithoutDocumentationComponent },
  { path: 'create', component: CreateBusinessesComponent },
  { path: ':businessId/edit', component: EditBusinessesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessesRoutingModule { }
