import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompliancesComponent } from './compliances/compliances.component';
import { CreateCompliancesComponent } from './create-compliances/create-compliances.component';
import { EditCommercialsComponent } from './edit-commercials/edit-commercials.component';
import { EditCompliancesComponent } from './edit-compliances/edit-compliances.component';

const routes: Routes = [
  { path: '', component: CompliancesComponent },
  { path: 'create', component: CreateCompliancesComponent },
  { path: ':complianceId/edit', component: EditCompliancesComponent },
  { path: ':complianceId/editCommercial', component: EditCommercialsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompliancesRoutingModule { }
