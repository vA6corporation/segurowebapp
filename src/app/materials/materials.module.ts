import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsRoutingModule } from './materials-routing.module';
import { MaterialsComponent } from './materials/materials.component';
import { CreateMaterialsComponent } from './create-materials/create-materials.component';
import { EditMaterialsComponent } from './edit-materials/edit-materials.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogCustomersComponent } from '../dialog-customers/dialog-customers.component';
import { DialogFinanciersComponent } from '../dialog-financiers/dialog-financiers.component';

@NgModule({
  declarations: [
    MaterialsComponent, 
    CreateMaterialsComponent, 
    EditMaterialsComponent,
    DialogCustomersComponent,
    DialogFinanciersComponent,
  ],
  imports: [
    CommonModule,
    MaterialsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class MaterialsModule { }
