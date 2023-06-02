import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeaceErrosComponent } from './seace-erros/seace-erros.component';
import { SeaceInboxComponent } from './seace-inbox/seace-inbox.component';
import { SeaceComponent } from './seace/seace.component';

const routes: Routes = [
  { path: '', component: SeaceComponent },
  { path: 'errors', component: SeaceErrosComponent },
  { path: 'seaceInbox', component: SeaceInboxComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeaceRoutingModule { }
