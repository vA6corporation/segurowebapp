import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'partnerships',
    loadChildren: () => import('./partnerships/partnerships.module').then(m => m.PartnershipsModule)
  },
  {
    path: 'beneficiaries',
    loadChildren: () => import('./beneficiaries/beneficiaries.module').then(m => m.BeneficiariesModule)
  },
  {
    path: 'financiers',
    loadChildren: () => import('./financiers/financiers.module').then(m => m.FinanciersModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'materials',
    loadChildren: () => import('./materials/materials.module').then(m => m.MaterialsModule)
  },
  {
    path: 'directs',
    loadChildren: () => import('./directs/directs.module').then(m => m.DirectsModule)
  },
  {
    path: 'compliances',
    loadChildren: () => import('./compliances/compliances.module').then(m => m.CompliancesModule)
  },
  {
    path: 'guaranties',
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: 'cheques',
    loadChildren: () => import('./cheques/cheques.module').then(m => m.ChequesModule)
  },
  {
    path: 'mails',
    loadChildren: () => import('./mails/mails.module').then(m => m.MailsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
