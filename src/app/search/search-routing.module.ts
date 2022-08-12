import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchCommercialComponent } from './search-commercial/search-commercial.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'commercial', component: SearchCommercialComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
