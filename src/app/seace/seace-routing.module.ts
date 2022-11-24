import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeaceComponent } from './seace/seace.component';

const routes: Routes = [
  { path: '', component: SeaceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeaceRoutingModule { }
