import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFideicomisosComponent } from './create-fideicomisos/create-fideicomisos.component';
import { EditFideicomisosComponent } from './edit-fideicomisos/edit-fideicomisos.component';
import { FideicomisosComponent } from './fideicomisos/fideicomisos.component';

const routes: Routes = [
  { path: '', component: FideicomisosComponent },
  { path: 'create', component: CreateFideicomisosComponent },
  { path: ':fideicomisoId/edit', component: EditFideicomisosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FideicomisosRoutingModule { }
