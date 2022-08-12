import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivilegesRoutingModule } from './privileges-routing.module';
import { EditPrivilegesComponent } from './edit-privileges/edit-privileges.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditPrivilegesComponent],
  imports: [
    CommonModule,
    PrivilegesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class PrivilegesModule { }
