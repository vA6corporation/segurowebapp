import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConstructionStatusComponent } from './construction-status/construction-status.component';

const routes: Routes = [
  { path: ':financierId', component: ConstructionStatusComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConstructionStatusRoutingModule { }
