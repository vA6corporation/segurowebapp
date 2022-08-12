import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareholdersRoutingModule } from './shareholders-routing.module';
import { ShareholdersComponent } from './shareholders/shareholders.component';
import { CreateShareholdersComponent } from './create-shareholders/create-shareholders.component';
import { EditShareholdersComponent } from './edit-shareholders/edit-shareholders.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ShareholdersComponent, CreateShareholdersComponent, EditShareholdersComponent],
  imports: [
    CommonModule,
    ShareholdersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class ShareholdersModule { }
