import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsRoutingModule } from './materials-routing.module';
import { MaterialsComponent } from './materials/materials.component';
import { CreateMaterialsComponent } from './create-materials/create-materials.component';
import { EditMaterialsComponent } from './edit-materials/edit-materials.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChequesModule } from '../cheques/cheques.module';
import { DepositsModule } from '../deposits/deposits.module';
import { DialogMaterialComponent } from './dialog-material/dialog-material.component';
import { MatDialogModule } from '@angular/material/dialog';
// import { CustomersModule } from '../customers/customers.module';
// import { PartnershipsModule } from '../partnerships/partnerships.module';

@NgModule({
  declarations: [
    MaterialsComponent, 
    CreateMaterialsComponent, 
    EditMaterialsComponent, DialogMaterialComponent,
  ],
  imports: [
    CommonModule,
    MaterialsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ChequesModule,
    DepositsModule,
    MatDialogModule,
    // CustomersModule,
    // PartnershipsModule,
  ]
})
export class MaterialsModule { }
