import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExperienceModel } from '../experiences/experience.model';
import { HttpService } from '../http.service';
import { InvestmentModel } from '../investments/investment.model';
import { MovablePropertyModel } from '../movable-properties/movable-property.model';
import { PropertyModel } from '../properties/property.model';
import { BusinessPdfModel } from './business-pdf.model';
import { BusinessModel } from './business.model';
import { FacilityCreditModel } from './facility-credit.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessesService {

  constructor(
    private readonly httpService: HttpService,
  ) { }
  
  getBusinesses(): Observable<BusinessModel[]> {
    return this.httpService.get('businesses');
  }

  getBusinessesByKey(key: string): Observable<BusinessModel[]> {
    return this.httpService.get(`businesses/byKey/${key}`);
  }

  getBusinessById(businessId: string): Observable<BusinessModel> {
    return this.httpService.get(`businesses/byId/${businessId}`);
  }

  getBusinessesByPage(pageIndex: number, pageSize: number): Observable<BusinessModel[]> {
    return this.httpService.get(`businesses/byPage/${pageIndex}/${pageSize}`);
  }

  getBusinessCount(): Observable<number> {
    return this.httpService.get('businesses/count');
  }

  create(business: BusinessModel): Observable<BusinessModel> {
    return this.httpService.post('businesses', { business });
  }

  update(
    business: BusinessModel, 
    experiences: ExperienceModel[],
    investments: InvestmentModel[],
    properties: PropertyModel[],
    movableProperties: MovablePropertyModel[],
    facilityCredits: FacilityCreditModel[],
    businessId: string
  ): Observable<BusinessModel> {
    return this.httpService.put(`businesses/${businessId}`, { 
      business, 
      experiences,
      investments,
      properties,
      facilityCredits,
      movableProperties, 
    });
  }

  getPdfs(businessId: string): Observable<BusinessPdfModel[]> {
    return this.httpService.get(`businesses/pdfsByBusinessId/${businessId}`);
  }

  uploadPdf(formData: FormData, businessId: string): Observable<string> {
    return this.httpService.postForm(`businesses/uploadPdf/${businessId}`, formData);
  }

  deletePdf(businessPdfId: string, pdfId: string): Observable<void> {
    return this.httpService.delete(`businesses/deletePdf/${businessPdfId}/${pdfId}`);
  }

}
