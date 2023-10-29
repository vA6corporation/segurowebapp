import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapitalIncreasesComponent } from './capital-increases/capital-increases.component';
import { CreateCapitalIncreasesComponent } from './create-capital-increases/create-capital-increases.component';
import { EditCapitalIncreasesComponent } from './edit-capital-increases/edit-capital-increases.component';

const routes: Routes = [
  { path: '', component: CapitalIncreasesComponent },
  { path: 'create', component: CreateCapitalIncreasesComponent },
  { path: ':capitalIncreaseId/edit', component: EditCapitalIncreasesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapitalIncreasesRoutingModule { }
