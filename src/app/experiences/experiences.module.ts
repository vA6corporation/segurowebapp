import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogExperiencesComponent } from './dialog-experiences/dialog-experiences.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DialogExperiencesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ExperiencesModule { }
