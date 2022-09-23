import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareholdersRoutingModule } from './shareholders-routing.module';
import { ShareholdersComponent } from './shareholders/shareholders.component';
import { CreateShareholdersComponent } from './create-shareholders/create-shareholders.component';
import { EditShareholdersComponent } from './edit-shareholders/edit-shareholders.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogShareholdersComponent } from './dialog-shareholders/dialog-shareholders.component';
import { DialogIncomesComponent } from './dialog-incomes/dialog-incomes.component';


@NgModule({
  declarations: [ShareholdersComponent, CreateShareholdersComponent, EditShareholdersComponent, DialogShareholdersComponent, DialogIncomesComponent],
  imports: [
    CommonModule,
    ShareholdersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class ShareholdersModule { }
