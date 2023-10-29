import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveysRoutingModule } from './surveys-routing.module';
import { SurveysComponent } from './surveys/surveys.component';
import { CreateSurveysComponent } from './create-surveys/create-surveys.component';
import { EditSurveysComponent } from './edit-surveys/edit-surveys.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogSurveysComponent } from './dialog-surveys/dialog-surveys.component';
import { SuccessSurveysComponent } from './success-surveys/success-surveys.component';
import { IndexSurveysComponent } from './index-surveys/index-surveys.component';


@NgModule({
  declarations: [
    SurveysComponent,
    CreateSurveysComponent,
    EditSurveysComponent,
    DialogSurveysComponent,
    SuccessSurveysComponent,
    IndexSurveysComponent
  ],
  imports: [
    CommonModule,
    SurveysRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class SurveysModule { }
