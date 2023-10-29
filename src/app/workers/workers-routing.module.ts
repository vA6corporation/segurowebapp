import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateWorkersComponent } from './create-workers/create-workers.component';
import { EditWorkersComponent } from './edit-workers/edit-workers.component';
import { WorkersComponent } from './workers/workers.component';
import { CommissionWorkersComponent } from './commission-workers/commission-workers.component';
import { TimingWorkersComponent } from './timing-workers/timing-workers.component';
import { GoalWorkersComponent } from './goal-workers/goal-workers.component';

const routes: Routes = [
  { path: '', component: WorkersComponent },
  { path: 'create', component: CreateWorkersComponent },
  { path: 'commissions', component: CommissionWorkersComponent },
  { path: 'timing', component: TimingWorkersComponent },
  { path: 'goals', component: GoalWorkersComponent },
  { path: ':workerId/edit', component: EditWorkersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkersRoutingModule { }
