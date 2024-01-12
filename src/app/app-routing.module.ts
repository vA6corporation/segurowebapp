import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'capitalIncreases',
    loadChildren: () => import('./capital-increases/capital-increases.module').then(m => m.CapitalIncreasesModule)
  },
  {
    path: 'surveys',
    loadChildren: () => import('./surveys/surveys.module').then(m => m.SurveysModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'certifiers',
    loadChildren: () => import('./certifiers/certifiers.module').then(m => m.CertifiersModule)
  },
  {
    path: 'devices',
    loadChildren: () => import('./devices/devices.module').then(m => m.DevicesModule)
  },
  {
    path: 'operations',
    loadChildren: () => import('./operations/operations.module').then(m => m.OperationsModule)
  },
  {
    path: 'tools',
    loadChildren: () => import('./tools/tools.module').then(m => m.ToolsModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule)
  },
  {
    path: 'activities',
    loadChildren: () => import('./activities/activities.module').then(m => m.ActivitiesModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule)
  },
  {
    path: 'seace',
    loadChildren: () => import('./seace/seace.module').then(m => m.SeaceModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'templatePartnerships',
    loadChildren: () => import('./template-partnerships/template-partnerships.module').then(m => m.TemplatePartnershipsModule)
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
    path: 'businesses',
    loadChildren: () => import('./businesses/businesses.module').then(m => m.BusinessesModule)
  },
  {
    path: 'insurances',
    loadChildren: () => import('./insurances/insurances.module').then(m => m.InsurancesModule)
  },
  {
    path: 'insurancesSctr',
    loadChildren: () => import('./insurances-sctr/insurances-sctr.module').then(m => m.InsurancesSctrModule)
  },
  {
    path: 'insurancesSoat',
    loadChildren: () => import('./insurances-soat/insurances-soat.module').then(m => m.InsurancesSoatModule)
  },
  {
    path: 'insurancesVidaley',
    loadChildren: () => import('./insurances-vidaley/insurances-vidaley.module').then(m => m.InsurancesVidaleyModule)
  },
  {
    path: 'insurancesPolizacar',
    loadChildren: () => import('./insurances-polizacar/insurances-polizacar.module').then(m => m.InsurancesPolizacarModule)
  },
  {
    path: 'insurancesPolizaear',
    loadChildren: () => import('./insurances-polizaear/insurances-polizaear.module').then(m => m.InsurancesPolizaearModule)
  },
  {
    path: 'insurancesPolizatrec',
    loadChildren: () => import('./insurances-polizatrec/insurances-polizatrec.module').then(m => m.InsurancesPolizatrecModule)
  },
  {
    path: 'insurancesMultirriesgos',
    loadChildren: () => import('./insurances-multirriesgos/insurances-multirriesgos.module').then(m => m.InsurancesMultirriesgosModule)
  },
  {
    path: 'insurancesRcivil',
    loadChildren: () => import('./insurances-rcivil/insurances-rcivil.module').then(m => m.InsurancesRcivilModule)
  },
  {
    path: 'insurancesVehicular',
    loadChildren: () => import('./insurances-vehicular/insurances-vehicular.module').then(m => m.InsurancesVehicularModule)
  },
  {
    path: 'insurancesVida',
    loadChildren: () => import('./insurances-vida/insurances-vida.module').then(m => m.InsurancesVidaModule)
  },
  {
    path: 'insurancesEps',
    loadChildren: () => import('./insurances-eps/insurances-eps.module').then(m => m.InsurancesEpsModule)
  },
  {
    path: 'insurancesSalud',
    loadChildren: () => import('./insurances-salud/insurances-salud.module').then(m => m.InsurancesSaludModule)
  },
  {
    path: 'insurancesAccidentes',
    loadChildren: () => import('./insurances-accidentes/insurances-accidentes.module').then(m => m.InsurancesAccidentesModule)
  },
  {
    path: 'insurancesFola',
    loadChildren: () => import('./insurances-fola/insurances-fola.module').then(m => m.InsurancesFolaModule)
  },
  {
    path: 'insurancesViaje',
    loadChildren: () => import('./insurances-viaje/insurances-viaje.module').then(m => m.InsurancesViajeModule)
  },
  {
    path: 'insurancesPempresarial',
    loadChildren: () => import('./insurances-pempresarial/insurances-pempresarial.module').then(m => m.InsurancesPempresarialModule)
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
    path: 'fideicomisos',
    loadChildren: () => import('./fideicomisos/fideicomisos.module').then(m => m.FideicomisosModule)
  },
  {
    path: 'isos',
    loadChildren: () => import('./isos/isos.module').then(m => m.IsosModule)
  },
  {
    path: 'insuranceBusinesses',
    loadChildren: () => import('./insurance-businesses/insurance-businesses.module').then(m => m.InsuranceBusinessesModule)
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
  {
    path: 'companies',
    loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
