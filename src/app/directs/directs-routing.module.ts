import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateDirectsComponent } from './create-directs/create-directs.component';
import { DirectsComponent } from './directs/directs.component';
import { EditCommercialsComponent } from './edit-commercials/edit-commercials.component';
import { EditDirectsComponent } from './edit-directs/edit-directs.component';

const routes: Routes = [
  { path: '', component: DirectsComponent },
  { path: 'create', component: CreateDirectsComponent },
  { path: ':directId/edit', component: EditDirectsComponent },
  { path: ':directId/editCommercial', component: EditCommercialsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectsRoutingModule { }
