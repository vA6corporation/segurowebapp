import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficesRoutingModule } from './offices-routing.module';
import { OfficesComponent } from './offices/offices.component';
import { EditOfficesComponent } from './edit-offices/edit-offices.component';
import { CreateOfficesComponent } from './create-offices/create-offices.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SetOfficeComponent } from './set-office/set-office.component';


@NgModule({
  declarations: [
    OfficesComponent,
    EditOfficesComponent,
    CreateOfficesComponent,
    SetOfficeComponent
  ],
  imports: [
    CommonModule,
    OfficesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class OfficesModule { }
