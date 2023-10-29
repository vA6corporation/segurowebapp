import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { BusinessModel } from '../businesses/business.model';
import { SurveyModel } from './survey.model';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  private businesses: BehaviorSubject<BusinessModel[]>|null = null;

  getSurveyById(surveyId: string): Observable<any> {
    return this.httpService.get(`surveys/byId/${surveyId}`);
  }

  getSummarySurveys(): Observable<BusinessModel[]> {
    return this.httpService.get(`surveys/summarySurveys`);
  }

  countSurveysByRangeDate(
    startDate: string, 
    endDate: string,
  ): Observable<number> {
    return this.httpService.get(`surveys/countSurveysByRangeDate/${startDate}/${endDate}`);
  }
  
  getSurveysByRangeDatePage(
    startDate: Date,
    endDate: Date,
    pageIndex: number,
    pagesize: number
  ): Observable<SurveyModel[]> {
    return this.httpService.get(`surveys/byRangeDatePage/${startDate}/${endDate}/${pageIndex}/${pagesize}`);
  }

  getSurveysByBusiness(businessId: string): Observable<any[]> {
    return this.httpService.get(`surveys/byBusiness/${businessId}`);
  }

  setSurvey(survey: any, businessId: string) {
    if (this.businesses) {
      const foundBuiness = this.businesses.getValue().find(e => e._id === businessId);
      if (foundBuiness) {
        Object.assign(foundBuiness, { lastSurvey: survey });
      }
    }
  }

  create(survey: any): Observable<any> {
    return this.httpService.post('surveys', { survey });
  }

  update(survey: any, surveyId: string) {
    return this.httpService.put(`surveys/${surveyId}`, { survey });
  }

}
