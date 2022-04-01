import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrimasComponent } from './primas/primas.component';

const routes: Routes = [
  { path: '', component: PrimasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrimasRoutingModule { }
