import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancierModelsRoutingModule } from './financiers-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FinancierModelsComponent } from './financiers/financiers.component';
import { CreateFinancierModelsComponent } from './create-financiers/create-financiers.component';
import { EditFinancierModelsComponent } from './edit-financiers/edit-financiers.component';
import { DialogFinanciesComponent } from '../financiers/dialog-financiers/dialog-financiers.component';

@NgModule({
  declarations: [
    FinancierModelsComponent,
    CreateFinancierModelsComponent,
    EditFinancierModelsComponent,
    DialogFinanciesComponent,
  ],
  imports: [
    CommonModule,
    FinancierModelsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class FinancierModelsModule { }
