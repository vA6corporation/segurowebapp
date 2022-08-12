import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateMaterialsComponent } from './create-materials/create-materials.component';
import { EditCommercialsComponent } from './edit-commercials/edit-commercials.component';
import { EditMaterialsComponent } from './edit-materials/edit-materials.component';
import { MaterialsComponent } from './materials/materials.component';

const routes: Routes = [
  { path: '', component: MaterialsComponent },
  { path: 'create', component: CreateMaterialsComponent },
  { path: ':materialId/edit', component: EditMaterialsComponent },
  { path: ':materialId/editCommercial', component: EditCommercialsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialsRoutingModule { }
