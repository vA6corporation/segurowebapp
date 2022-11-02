import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogBoardMembersComponent } from './dialog-board-members/dialog-board-members.component';

@NgModule({
  declarations: [DialogBoardMembersComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class BoardMembersModule { }
