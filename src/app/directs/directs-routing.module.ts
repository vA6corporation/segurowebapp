import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateDirectsComponent } from './create-directs/create-directs.component';
import { DirectsComponent } from './directs/directs.component';
import { EditDirectsComponent } from './edit-directs/edit-directs.component';

const routes: Routes = [
  { path: '', component: DirectsComponent },
  { path: 'create', component: CreateDirectsComponent },
  { path: ':directId/edit', component: EditDirectsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectsRoutingModule { }
