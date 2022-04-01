import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCreditsComponent } from './create-credits/create-credits.component';
import { CreditsComponent } from './credits/credits.component';
import { EditCreditsComponent } from './edit-credits/edit-credits.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: '', component: CreditsComponent },
  { path: 'create', component: CreateCreditsComponent },
  { path: ':creditId/edit', component: EditCreditsComponent },
  { path: 'report', component: ReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditsRoutingModule { }
