import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogMovablePropertiesComponent } from './dialog-movable-properties/dialog-movable-properties.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DialogMovablePropertiesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MovablePropertiesModule { }
