import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BusinessesService } from 'src/app/businesses/businesses.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { SurveysService } from '../surveys.service';

export enum ExperienceTimeType {
    NEW_CUSTOMER,
    ONE_TO_TWELVE_MONTHS,
    ONE_YEAR_TO_MORE,
    ONE_SERVICE
}

export enum ExperienceAdvisorType {
    ONE,
    TWO,
    THREE,
    FOUR,
}

export enum ExperienceAttentionType {
    BAD,
    REGULAR,
    GOOD,
    EXCELLENT,
}

export enum ExperienceRecommendType {
    ONE,
    TWO,
    THREE,
    FOUR,
}

@Component({
    selector: 'app-create-surveys',
    templateUrl: './create-surveys.component.html',
    styleUrls: ['./create-surveys.component.sass']
})
export class CreateSurveysComponent implements OnInit {

    constructor(
        private readonly navigationService: NavigationService,
        private readonly businessService: BusinessesService,
        private readonly surveysService: SurveysService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
    ) { }

    times: any[] = [
        { label: 'Soy cliente nuevo', value: ExperienceTimeType.NEW_CUSTOMER },
        { label: 'De 1 a 12 meses', value: ExperienceTimeType.ONE_TO_TWELVE_MONTHS },
        { label: 'De 1 año a mas', value: ExperienceTimeType.ONE_YEAR_TO_MORE },
        { label: 'Solo contacte para este servicio', value: ExperienceTimeType.ONE_SERVICE }
    ];
    experienceAdvisors: any[] = [
        { label: 'Muy satisfecho', value: ExperienceAdvisorType.ONE },
        { label: 'Algo satisfecho', value: ExperienceAdvisorType.TWO },
        { label: 'Satisfecho', value: ExperienceAdvisorType.THREE },
        { label: 'Insatisfecho', value: ExperienceAdvisorType.FOUR },
    ];
    experienceAttentions: any[] = [
        { label: 'Muy buena y rápida', value: ExperienceAttentionType.EXCELLENT },
        { label: 'Buena, esperé un tiempo, pero recibí respuesta', value: ExperienceAttentionType.GOOD },
        { label: 'Regular/lenta', value: ExperienceAttentionType.REGULAR },
        { label: 'Mala/no recibí respuesta', value: ExperienceAttentionType.BAD },
    ];
    experienceRecommends: any[] = [
        { label: 'Muy probable', value: ExperienceRecommendType.ONE },
        { label: 'Probable', value: ExperienceRecommendType.TWO },
        { label: 'Poco probable', value: ExperienceRecommendType.THREE },
        { label: 'Nada probable', value: ExperienceRecommendType.FOUR },
    ];
    isLoading: boolean = false;
    formGroup = this.formBuilder.group({
        fromCountry: [null, Validators.required],
        suggestion: [null, Validators.required],
        time: [null, Validators.required],
        experienceAdvisor: [null, Validators.required],
        experienceAttention: [null, Validators.required],
        experienceRecommend: [null, Validators.required],
        businessId: '',
    });

    private params$: Subscription = new Subscription();
    private businessId: string = '';

    onOnDestroy() {
        this.params$.unsubscribe();
    }

    ngOnInit(): void {
        this.params$ = this.activatedRoute.params.subscribe(params => {
            this.businessId = params['businessId'];
            this.businessService.getBusinessById(this.businessId).subscribe(business => {
                this.navigationService.setTitle(`Nueva encuesta - ${business.name.toUpperCase()}`);
            });
        });
    }

    onSubmit() {
        console.log(this.formGroup.value);
        if (this.formGroup.valid) {
            this.navigationService.loadBarStart();
            const survey = this.formGroup.value;
            survey.businessId = this.businessId;
            this.surveysService.create(survey).subscribe(survey => {
                this.surveysService.setSurvey(survey, this.businessId);
                this.router.navigate(['/surveys']);
                this.navigationService.showMessage('Registrado correctamente');
                this.navigationService.loadBarFinish();
            });
        }
    }

}
