import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogExperiencesComponent } from './dialog-experiences/dialog-experiences.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogEditExperiencesComponent } from './dialog-edit-experiences/dialog-edit-experiences.component';

@NgModule({
  declarations: [DialogExperiencesComponent, DialogEditExperiencesComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
export class ExperiencesModule {}
