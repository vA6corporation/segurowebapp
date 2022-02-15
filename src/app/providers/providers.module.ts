import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersComponent } from './providers/providers.component';
import { DialogProvidersComponent } from './dialog-providers/dialog-providers.component';
import { DialogCreateProvidersComponent } from './dialog-create-providers/dialog-create-providers.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogEditProvidersComponent } from './dialog-edit-providers/dialog-edit-providers.component';
import { CreateProvidersComponent } from './create-providers/create-providers.component';
import { EditProvidersComponent } from './edit-providers/edit-providers.component';


@NgModule({
  declarations: [
    ProvidersComponent,
    DialogProvidersComponent,
    DialogCreateProvidersComponent,
    DialogEditProvidersComponent,
    CreateProvidersComponent,
    EditProvidersComponent,
  ],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class ProvidersModule { }
