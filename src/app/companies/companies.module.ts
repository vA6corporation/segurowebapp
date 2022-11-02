import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies/companies.component';
import { CreateCompaniesComponent } from './create-companies/create-companies.component';
import { EditCompaniesComponent } from './edit-companies/edit-companies.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CompaniesComponent, CreateCompaniesComponent, EditCompaniesComponent],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CompaniesModule { }
