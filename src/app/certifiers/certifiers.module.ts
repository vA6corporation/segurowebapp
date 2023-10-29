import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertifiersRoutingModule } from './certifiers-routing.module';
import { CertifiersComponent } from './certifiers/certifiers.component';
import { CreateCertifiersComponent } from './create-certifiers/create-certifiers.component';
import { EditCertifiersComponent } from './edit-certifiers/edit-certifiers.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CertifiersComponent,
    CreateCertifiersComponent,
    EditCertifiersComponent
  ],
  imports: [
    CommonModule,
    CertifiersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class CertifiersModule { }
