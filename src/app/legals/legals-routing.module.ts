import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LegalsComponent } from './legals/legals.component';

const routes: Routes = [
  { path: '', component: LegalsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalsRoutingModule { }
