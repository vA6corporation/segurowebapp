import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateShareholdersComponent } from './create-shareholders/create-shareholders.component';
import { EditShareholdersComponent } from './edit-shareholders/edit-shareholders.component';
import { ShareholdersComponent } from './shareholders/shareholders.component';

const routes: Routes = [
  { path: '', component: ShareholdersComponent },
  { path: 'create', component: CreateShareholdersComponent },
  { path: ':shareholderId/edit', component: EditShareholdersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShareholdersRoutingModule { }
