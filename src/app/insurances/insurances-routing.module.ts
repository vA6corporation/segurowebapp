import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateInsurancesWithInsuranceGroupComponent } from './create-insurances-with-insurance-group/create-insurances-with-insurance-group.component';
import { CreateInsurancesComponent } from './create-insurances/create-insurances.component';
import { EditInsurancesComponent } from './edit-insurances/edit-insurances.component';
import { InsurancesComponent } from './insurances/insurances.component';
import { RenewComponent } from './renew/renew.component';
import { ReportPieComponent } from './report-pie/report-pie.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
    { path: 'renew', component: RenewComponent },
    { path: 'create/:type/:insuranceGroupId', component: CreateInsurancesComponent },
    { path: 'createWithInsuranceGroup/:type', component: CreateInsurancesWithInsuranceGroupComponent },
    { path: ':type', component: InsurancesComponent },
    { path: ':type/createWithGroup', component: CreateInsurancesComponent },
    { path: ':insuranceId/edit', component: EditInsurancesComponent },
    { path: 'report/report', component: ReportComponent },
    { path: 'report/reportPie', component: ReportPieComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InsurancesRoutingModule { }
