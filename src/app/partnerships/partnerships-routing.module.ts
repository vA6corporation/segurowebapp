import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePartnershipsComponent } from './create-partnerships/create-partnerships.component';
import { EditPartnershipsComponent } from './edit-partnerships/edit-partnerships.component';
import { PartnershipsCommercialComponent } from './partnerships-commercial/partnerships-commercial.component';
import { PartnershipsComponent } from './partnerships/partnerships.component';

const routes: Routes = [
  { path: '', component: PartnershipsComponent },
  { path: 'create', component: CreatePartnershipsComponent },
  { path: ':partnershipId/edit', component: EditPartnershipsComponent },
  { path: 'commercial', component: PartnershipsCommercialComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnershipsRoutingModule { }
