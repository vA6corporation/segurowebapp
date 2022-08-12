import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search/search.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchCommercialComponent } from './search-commercial/search-commercial.component';


@NgModule({
  declarations: [
    SearchComponent,
    SearchCommercialComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class SearchModule { }
