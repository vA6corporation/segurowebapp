import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BusinessModel } from 'src/app/businesses/business.model';
import { BusinessesService } from 'src/app/businesses/businesses.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogSurveysComponent } from '../dialog-surveys/dialog-surveys.component';
import { SurveyDb } from '../survey.db';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.sass']
})
export class SurveysComponent implements OnInit {

  constructor(
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly businessesService: BusinessesService,
    private readonly surveyDb: SurveyDb,
    private readonly formBuilder: FormBuilder
  ) { }
    
  public displayedColumns: string[] = [ 'document', 'name', 'email', 'emailPerfilprov', 'mobileNumber', 'mobileNumberPerfilprov', 'lastSurvey', 'experienceObservations', 'actions' ];
  public dataSource: BusinessModel[] = [];
  public tmpDataSource: BusinessModel[] = [];
  public length: number = 100;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  public formGroup: FormGroup = this.formBuilder.group({
    date: [ new Date(), Validators.required ],
    isObservated: null,
    isOnlyPartnership: null
  });

  private queryParams$: Subscription = new Subscription();
  private handleRandomBusinesses$: Subscription = new Subscription();
  private handleSearch$: Subscription = new Subscription();

  ngOnDestroy() {
    this.queryParams$.unsubscribe();
    this.handleRandomBusinesses$.unsubscribe();
    this.handleSearch$.unsubscribe();
  }
    
  ngOnInit(): void {
    this.navigationService.setTitle('Encuestas');

    this.navigationService.setMenu([
      { id: 'search', label: 'search', icon: 'search', show: true },
      // { id: 'export_businesses', label: 'Exportar excel', icon: 'download', show: false }
    ]);

    this.handleSearch$ = this.navigationService.handleSearch().subscribe(key => {
      this.businessesService.getBusinessesByKey(key).subscribe(businesses => {
        this.dataSource = businesses;
      });
    });

    this.surveyDb.loadDb().then(async () => {
      const date = new Date();
      const surveyObject = await this.surveyDb.getSurveyObejctByDate(date.toLocaleDateString());
      if (surveyObject) {
        this.navigationService.loadBarStart();
        this.businessesService.getBusinessesByIds(surveyObject.businessIds).subscribe(businesses => {
          this.navigationService.loadBarFinish();
          this.dataSource = businesses;
          this.tmpDataSource = businesses;
        });
      } else {
        this.fetchData();
      }
    });
  }

  async onDateChange() {
    console.log(this.formGroup.valid);
    if (this.formGroup.valid) {
      const { date } = this.formGroup.value;
      const surveyObject = await this.surveyDb.getSurveyObejctByDate(date.toLocaleDateString());
      if (surveyObject) {
        this.navigationService.loadBarStart();
        this.businessesService.getBusinessesByIds(surveyObject.businessIds).subscribe(businesses => {
          this.navigationService.loadBarFinish();
          this.dataSource = businesses;
          this.tmpDataSource = businesses;
          this.onIsObservatedChange();
        });
      } else {
        this.fetchData();
      }
    }
  }

  onIsObservatedChange() {
    const { isObservated, isOnlyPartnership } = this.formGroup.value;
    if (isObservated === null && isOnlyPartnership === null) {
      this.dataSource = this.tmpDataSource;
    } else {
      this.dataSource = this.tmpDataSource.filter(e => {
        if (isObservated === null) {
          return true;
        } else {
          return !!e.experienceObservations === isObservated
        }
      }).filter(e => {
        if (isOnlyPartnership === null) {
          return true;
        } else {
          return e.isOnlyPartnership === isOnlyPartnership
        }
      });
    }
  }

  fetchData() {
    this.navigationService.loadBarStart();
    const { date } = this.formGroup.value;
    this.businessesService.getRandomBusinesses().subscribe(businesses => {
      this.dataSource = businesses;
      this.tmpDataSource = businesses;
      this.surveyDb.create(businesses, date);
      this.onIsObservatedChange();
      this.navigationService.loadBarFinish();
    });
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

  onUpdateMobileNumber(business: BusinessModel) {
    const mobileNumber = prompt('Actualizar celular');
    if (mobileNumber) {
      business.mobileNumber = mobileNumber;
      this.businessesService.updateMobileNumber(mobileNumber, business._id).subscribe(() => {
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

}
