import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogPropertiesComponent } from './dialog-properties/dialog-properties.component';

@NgModule({
  declarations: [DialogPropertiesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class PropertiesModule { }
