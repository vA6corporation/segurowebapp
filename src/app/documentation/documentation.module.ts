import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentationRoutingModule } from './documentation-routing.module';
import { DocumentationComponent } from './documentation/documentation.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DocumentationComponent],
  imports: [
    CommonModule,
    DocumentationRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DocumentationModule { }
