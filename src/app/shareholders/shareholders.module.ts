import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareholdersRoutingModule } from './shareholders-routing.module';
import { ShareholdersComponent } from './shareholders/shareholders.component';
import { CreateShareholdersComponent } from './create-shareholders/create-shareholders.component';
import { EditShareholdersComponent } from './edit-shareholders/edit-shareholders.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogShareholdersComponent } from './dialog-shareholders/dialog-shareholders.component';
import { DialogIncomesComponent } from './dialog-incomes/dialog-incomes.component';
import { InvestmentsModule } from '../investments/investments.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [ShareholdersComponent, CreateShareholdersComponent, EditShareholdersComponent, DialogShareholdersComponent, DialogIncomesComponent],
  imports: [
    CommonModule,
    ShareholdersRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    InvestmentsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class ShareholdersModule { }
