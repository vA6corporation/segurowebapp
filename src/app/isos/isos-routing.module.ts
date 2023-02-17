import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateIsosComponent } from './create-isos/create-isos.component';
import { EditIsosComponent } from './edit-isos/edit-isos.component';
import { IsosComponent } from './isos/isos.component';

const routes: Routes = [
  { path: '', component: IsosComponent },
  { path: 'create', component: CreateIsosComponent },
  { path: ':isoId/edit', component: EditIsosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IsosRoutingModule { }
