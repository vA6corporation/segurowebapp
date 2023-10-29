import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SurveysService } from '../surveys.service';

@Component({
  selector: 'app-dialog-surveys',
  templateUrl: './dialog-surveys.component.html',
  styleUrls: ['./dialog-surveys.component.sass']
})
export class DialogSurveysComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly businessId: string,
    private readonly surveysService: SurveysService,
  ) { }

  public surveys: any[] = [];

  ngOnInit(): void {
    this.surveysService.getSurveysByBusiness(this.businessId).subscribe(surveys => {
      this.surveys = surveys;
    });
  }

}
