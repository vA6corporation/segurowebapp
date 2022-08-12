import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'shareholders',
    loadChildren: () => import('./shareholders/shareholders.module').then(m => m.ShareholdersModule)
  },
  {
    path: 'templates',
    loadChildren: () => import('./templates/templates.module').then(m => m.TemplatesModule)
  },
  {
    path: 'insurances',
    loadChildren: () => import('./insurances/insurances.module').then(m => m.InsurancesModule)
  },
  {
    path: 'brokers',
    loadChildren: () => import('./brokers/brokers.module').then(m => m.BrokersModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'constructions',
    loadChildren: () => import('./constructions/constructions.module').then(m => m.ConstructionsModule)
  },
  {
    path: 'documentation',
    loadChildren: () => import('./documentation/documentation.module').then(m => m.DocumentationModule)
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
    loadChildren: () => import('./financiers/financiers.module').then(m => m.FinancierModelsModule)
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
  },
  {
    path: 'collections',
    loadChildren: () => import('./collections/collections.module').then(m => m.CollectionsModule)
  },
  {
    path: 'primas',
    loadChildren: () => import('./primas/primas.module').then(m => m.PrimasModule)
  },
  {
    path: 'constructionStatus',
    loadChildren: () => import('./construction-status/construction-status.module').then(m => m.ConstructionStatusModule)
  },
  {
    path: 'workers',
    loadChildren: () => import('./workers/workers.module').then(m => m.WorkersModule)
  },
  {
    path: 'providers',
    loadChildren: () => import('./providers/providers.module').then(m => m.ProvidersModule)
  },
  {
    path: 'paymentOrders',
    loadChildren: () => import('./payment-orders/payment-orders.module').then(m => m.PaymentOrdersModule)
  },
  {
    path: 'banks',
    loadChildren: () => import('./banks/banks.module').then(m => m.BanksModule)
  },
  {
    path: 'legals',
    loadChildren: () => import('./legals/legals.module').then(m => m.LegalsModule)
  },
  {
    path: 'credits',
    loadChildren: () => import('./credits/credits.module').then(m => m.CreditsModule)
  },
  {
    path: 'insuranceCustomers',
    loadChildren: () => import('./insurance-customers/insurance-customers.module').then(m => m.InsuranceCustomersModule)
  },
  {
    path: 'insurancePartnerships',
    loadChildren: () => import('./insurance-partnerships/insurance-partnerships.module').then(m => m.InsurancePartnershipsModule)
  },
  {
    path: 'insuranceConstructions',
    loadChildren: () => import('./insurance-constructions/insurance-constructions.module').then(m => m.InsuranceConstructionsModule)
  },
  {
    path: 'privileges',
    loadChildren: () => import('./privileges/privileges.module').then(m => m.PrivilegesModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'offices',
    loadChildren: () => import('./offices/offices.module').then(m => m.OfficesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
