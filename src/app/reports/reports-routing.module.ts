import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuarantiesComponent } from './guaranties/guaranties.component';

const routes: Routes = [
  { path: 'guaranties', component: GuarantiesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
