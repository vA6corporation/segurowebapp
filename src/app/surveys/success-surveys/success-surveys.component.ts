import { Component, OnInit } from '@angular/core';
import { SurveysService } from '../surveys.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BusinessesService } from 'src/app/businesses/businesses.service';
import { BusinessModel } from 'src/app/businesses/business.model';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { DialogSurveysComponent } from '../dialog-surveys/dialog-surveys.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyModel } from '../survey.model';
import { PageEvent } from '@angular/material/paginator';
import { ExperienceAdvisorType, ExperienceAttentionType, ExperienceRecommendType, ExperienceTimeType } from '../create-surveys/create-surveys.component';
import { formatDate } from '@angular/common';
import { buildExcel } from 'src/app/xlsx';

@Component({
  selector: 'app-success-surveys',
  templateUrl: './success-surveys.component.html',
  styleUrls: ['./success-surveys.component.sass']
})
export class SuccessSurveysComponent implements OnInit {

  constructor(
    private readonly surveysService: SurveysService,
    private readonly navigationService: NavigationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly matDialog: MatDialog,
    private readonly businessesService: BusinessesService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) { }
    
  public displayedColumns: string[] = [ 'createdAt', 'document', 'name', 'qualification', 'actions' ];
  public dataSource: SurveyModel[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  public formGroup: FormGroup = this.formBuilder.group({
    startDate: [ new Date(), Validators.required ],
    endDate: [ new Date(), Validators.required ]
  });

  private queryParams$: Subscription = new Subscription();
  private handleClickMenu$: Subscription = new Subscription();

  ngOnDestroy() {
    this.queryParams$.unsubscribe();
    this.handleClickMenu$.unsubscribe();
  }
    
  ngOnInit(): void {
    this.navigationService.setTitle('Encuestas');
    this.queryParams$ = this.activatedRoute.queryParams.pipe(first()).subscribe(params => {
      const { pageIndex, pageSize } = params;
      this.pageIndex = Number(pageIndex || 0);
      this.pageSize = Number(pageSize || 10);
      this.fetchData();
      this.fetchCount();
    });

    this.navigationService.setMenu([
      // { id: 'search', label: 'search', icon: 'search', show: true },
      { id: 'export_businesses', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
      this.navigationService.loadBarStart();
      this.surveysService.getSummarySurveys().subscribe(businesses => {
        this.navigationService.loadBarFinish();
        const wscols = [ 40, 40, 40, 40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
        let body = [];
        body.push([
          'EMPRESA',
          'OBSERVACION',
          'E. FECHA',
          'ORIGEN',
          'T. TRABAJANDO',
          'E. CON COLABORADOR',
          'E. ATENCION',
          'E. RECOMENDACION',
          'E. SUGERENCIA',
        ]);
        for (const business of businesses) {
          body.push([
            business.name,
            business.experienceObservations,
            business.lastSurvey ? formatDate(new Date(business.lastSurvey.createdAt), 'dd/MM/yyyy', 'en-US') : null,
            business.lastSurvey ? business.lastSurvey.fromCountry : null,
            business.lastSurvey ? this.checkTime(business.lastSurvey) : null,
            business.lastSurvey ? this.checkAdvisor(business.lastSurvey) : null,
            business.lastSurvey ? this.checkAttention(business.lastSurvey) : null,
            business.lastSurvey ? this.checkRecommend(business.lastSurvey) : null,
            business.lastSurvey ? business.lastSurvey.suggestion : null
          ]);
        }
        const name = `ENCUESTAS_${formatDate(new Date(), 'dd/MM/yyyy', 'en-US')}`;
        buildExcel(body, name, wscols, [], []);
      });
    });
  }

  checkTime(survey: SurveyModel) {
    switch(survey.time) {
      case ExperienceTimeType.NEW_CUSTOMER:
        return 'CLIENTE NUEVO';
      case ExperienceTimeType.ONE_TO_TWELVE_MONTHS:
        return '1 - 12 MESES';
      case ExperienceTimeType.ONE_YEAR_TO_MORE:
        return '1 AÑO A MAS';
      case ExperienceTimeType.ONE_SERVICE:
        return 'SOLO ESTE SERVICIO';
      default:
        return '';
    }
  }

  checkAdvisor(survey: SurveyModel) {
    switch (survey.experienceAdvisor) {
      case ExperienceAdvisorType.ONE:
        return 'MUY SATISFECHO'
      case ExperienceAdvisorType.TWO:
        return 'ALGO SATISFECHO';
      case ExperienceAdvisorType.THREE:
        return 'SATISFECHO';
      case ExperienceAdvisorType.FOUR:
        return 'INSATISFECHO';
      default:
        return '';
    }
  }

  checkAttention(survey: SurveyModel) {
    switch (survey.experienceAttention) {
      case ExperienceAttentionType.EXCELLENT:
        return 'EXCELENTE';
      case ExperienceAttentionType.GOOD:
        return 'BUENA';
      case ExperienceAttentionType.REGULAR:
        return 'REGULAR';
      case ExperienceAttentionType.BAD:
        return 'MALA'
      default:
        return ''
    }
  }

  checkRecommend(survey: SurveyModel) {
    switch (survey.experienceRecommend) {
      case ExperienceRecommendType.ONE:
        return 'MUY PROBABLE'
      case ExperienceRecommendType.TWO:
        return 'PROBABLE';
      case ExperienceRecommendType.THREE:
        return 'POCO PROBABLE';
      case ExperienceRecommendType.FOUR:
        return 'NADA PROBABLE';
      default:
        return '';
    }
  }

  fetchData() {
    this.navigationService.loadBarStart();
    const { startDate, endDate } = this.formGroup.value;
    this.surveysService.getSurveysByRangeDatePage(startDate, endDate, this.pageIndex + 1, this.pageSize).subscribe(surveys => {
      this.dataSource = surveys;
      this.navigationService.loadBarFinish();
    });
  }

  fetchCount() {
    const { startDate, endDate } = this.formGroup.value;
    this.surveysService.countSurveysByRangeDate(startDate, endDate).subscribe(count => {
      this.length = count;
    });
  }

  onRangeChange() {
    if (this.formGroup.valid) {
      this.pageIndex = 0;

      const { startDate, endDate } = this.formGroup.value;

      const queryParams: Params = { startDate: startDate, endDate: endDate, pageIndex: 0 };

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams, 
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

      this.fetchData();
      this.fetchCount();
    }
  }

  onUpdateObservations(business: BusinessModel) {
    const experienceObservations = prompt('Observaciones');
    if (experienceObservations) {
      business.experienceObservations = experienceObservations;
      this.businessesService.updateExperienceObservations(experienceObservations, business._id).subscribe(() => {
        this.navigationService.showMessage('Se han guardado los cambios');
      });
    }
  }

  onUpdateEmail(business: BusinessModel) {
    const email = prompt('Actualizar email');
    if (email) {
      business.email = email;
      this.businessesService.updateEmail(email, business._id).subscribe(() => {
        this.navigationService.showMessage('Se han guardado los cambios');
      });
    }
  }

  onDialogSurveys(businessId: string) {
    const dialogRef = this.matDialog.open(DialogSurveysComponent, {
      width: '600px',
      position: { top: '20px' },
      data: businessId,
    });
  }

  handlePageEvent(event: PageEvent): void {
    const { pageIndex, pageSize } = event;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;

    const queryParams: Params = { pageIndex, pageSize };

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams, 
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });

    this.fetchData();
  }

}
