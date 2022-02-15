import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './collections/collections.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [CollectionsComponent],
  imports: [
    CommonModule,
    CollectionsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class CollectionsModule { }
