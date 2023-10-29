import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOperationsComponent } from './create-operations/create-operations.component';
import { EditOperationsComponent } from './edit-operations/edit-operations.component';
import { OperationsComponent } from './operations/operations.component';

const routes: Routes = [
  { path: '', component: OperationsComponent },
  { path: 'create', component: CreateOperationsComponent },
  { path: ':operationId/edit', component: EditOperationsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
