import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkersRoutingModule } from './workers-routing.module';
import { EditWorkersComponent } from './edit-workers/edit-workers.component';
import { WorkersComponent } from './workers/workers.component';
import { CreateWorkersComponent } from './create-workers/create-workers.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DeletedWorkersComponent } from './deleted-workers/deleted-workers.component';
import { TimingWorkersComponent } from './timing-workers/timing-workers.component';
import { CommissionWorkersComponent } from './commission-workers/commission-workers.component';
import { GoalWorkersComponent } from './goal-workers/goal-workers.component';


@NgModule({
  declarations: [
    EditWorkersComponent,
    WorkersComponent,
    CreateWorkersComponent,
    DeletedWorkersComponent,
    TimingWorkersComponent,
    CommissionWorkersComponent,
    GoalWorkersComponent
  ],
  imports: [
    CommonModule,
    WorkersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class WorkersModule { }
