import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertifiersComponent } from './certifiers/certifiers.component';
import { CreateCertifiersComponent } from './create-certifiers/create-certifiers.component';
import { EditCertifiersComponent } from './edit-certifiers/edit-certifiers.component';

const routes: Routes = [
  { path: '', component: CertifiersComponent },
  { path: 'create', component: CreateCertifiersComponent },
  { path: ':certifierId/edit', component: EditCertifiersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertifiersRoutingModule { }
