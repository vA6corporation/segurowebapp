import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSurveysComponent } from './create-surveys/create-surveys.component';
import { EditSurveysComponent } from './edit-surveys/edit-surveys.component';
import { IndexSurveysComponent } from './index-surveys/index-surveys.component';

const routes: Routes = [
  { path: '', component: IndexSurveysComponent },
  { path: ':businessId/create', component: CreateSurveysComponent },
  { path: ':surveyId/edit', component: EditSurveysComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveysRoutingModule { }
