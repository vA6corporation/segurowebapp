import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogExperiencesComponent } from './dialog-experiences/dialog-experiences.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogEditExperiencesComponent } from './dialog-edit-experiences/dialog-edit-experiences.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [DialogExperiencesComponent, DialogEditExperiencesComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class ExperiencesModule {}
