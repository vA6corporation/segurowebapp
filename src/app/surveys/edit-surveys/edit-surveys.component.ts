import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ExperienceAdvisorType, ExperienceAttentionType, ExperienceRecommendType, ExperienceTimeType } from '../create-surveys/create-surveys.component';
import { SurveysService } from '../surveys.service';

@Component({
  selector: 'app-edit-surveys',
  templateUrl: './edit-surveys.component.html',
  styleUrls: ['./edit-surveys.component.sass']
})
export class EditSurveysComponent implements OnInit {

  constructor(
    private readonly navigationService: NavigationService,
    private readonly surveysService: SurveysService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
  ) { }

  public favoriteSeason: string = '';
  
  public times: any[] = [
    { label: 'Soy cliente nuevo', value: ExperienceTimeType.NEW_CUSTOMER },
    { label: 'De 1 a 12 meses', value: ExperienceTimeType.ONE_TO_TWELVE_MONTHS },
    { label: 'De 1 año a mas', value: ExperienceTimeType.ONE_YEAR_TO_MORE },
    { label: 'Solo contacte para este servicio', value: ExperienceTimeType.ONE_SERVICE }
  ];
  public experienceAdvisors: any[] = [
    { label: 'Muy satisfecho', value: ExperienceAdvisorType.ONE },
    { label: 'Algo satisfecho', value: ExperienceAdvisorType.TWO },
    { label: 'Satisfecho', value: ExperienceAdvisorType.THREE },
    { label: 'Insatisfecho', value: ExperienceAdvisorType.FOUR },
  ];
  public experienceAttentions: any[] = [
    { label: 'Muy buena y rápida', value: ExperienceAttentionType.EXCELLENT },
    { label: 'Buena, esperé un tiempo, pero recibí respuesta', value: ExperienceAttentionType.GOOD },
    { label: 'Regular/lenta', value: ExperienceAttentionType.REGULAR },
    { label: 'Mala/no recibí respuesta', value: ExperienceAttentionType.BAD },
  ];
  public experienceRecommends: any[] = [
    { label: 'Muy probable', value: ExperienceRecommendType.ONE },
    { label: 'Probable', value: ExperienceRecommendType.TWO },
    { label: 'Poco probable', value: ExperienceRecommendType.THREE },
    { label: 'Nada probable', value: ExperienceRecommendType.FOUR },
  ];
  public isLoading: boolean = false;
  public formGroup = this.formBuilder.group({
    suggestion: [ null, Validators.required ],
    fromCountry: [ null, Validators.required ],
    time: [ null, Validators.required ],
    experienceAdvisor: [ null, Validators.required ],
    // experienceDoubt: [ null, Validators.required ],
    experienceAttention: [ null, Validators.required ],
    experienceRecommend: [ null, Validators.required ],
    businessId: '',
  });

  private params$: Subscription = new Subscription();
  private surveyId: string = '';

  onOnDestroy() {
    this.params$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.backTo();
    this.params$ = this.activatedRoute.params.subscribe(params => {
      this.surveyId = params['surveyId'];
      this.surveysService.getSurveyById(this.surveyId).subscribe(survey => {
        this.formGroup.patchValue(survey);
        this.navigationService.setTitle(`Editar encuesta - ${survey.business.name.toUpperCase()}`);
      });
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      this.surveysService.update(this.formGroup.value, this.surveyId).subscribe(survey => {
        this.navigationService.showMessage('Se han guardado los cambios');
        this.navigationService.loadBarFinish();
      });
    }
  }

}
