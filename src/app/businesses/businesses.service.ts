import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { ExperienceModel } from '../experiences/experience.model';
import { HttpService } from '../http.service';
import { InvestmentModel } from '../investments/investment.model';
import { MovablePropertyModel } from '../movable-properties/movable-property.model';
import { PropertyModel } from '../properties/property.model';
import { BusinessNodeModel } from './business-node.model';
import { BusinessModel } from './business.model';
import { GuarantiesModel } from './dialog-add-guaranties/guaranties.model';
import { FacilityCreditModel } from './facility-credit.model';

@Injectable({
    providedIn: 'root'
})
export class BusinessesService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    getBusinessesWithoutDocumentation(params: Params): Observable<BusinessModel[]> {
        return this.httpService.get('businesses/withoutDocumentation', params);
    }

    getBusinessesByIds(businessIds: string[]): Observable<BusinessModel[]> {
        return this.httpService.post('businesses/byIds', { businessIds });
    }

    getRandomBusinesses(): Observable<BusinessModel[]> {
        return this.httpService.get('businesses/random');
    }

    updateExperienceObservations(experienceObservations: string, businessId: string): Observable<void> {
        return this.httpService.get(`businesses/experienceObservations/${experienceObservations}/${businessId}`);
    }

    updateEmail(email: string, businessId: string): Observable<void> {
        return this.httpService.get(`businesses/email/${email}/${businessId}`);
    }

    updateMobileNumber(mobileNumber: string, businessId: string): Observable<void> {
        return this.httpService.get(`businesses/mobileNumber/${mobileNumber}/${businessId}`);
    }

    getBusinessesBirthday(): Observable<BusinessModel[]> {
        return this.httpService.get('businesses/birthday');
    }

    getBusinessById(businessId: string): Observable<BusinessModel> {
        return this.httpService.get(`businesses/byId/${businessId}`);
    }

    getBusinessesByKey(key: string): Observable<BusinessModel[]> {
        return this.httpService.get(`businesses/byKey/${key}`);
    }

    getBusinessesByWorkerKey(workerId: string, key: string): Observable<BusinessModel[]> {
        return this.httpService.get(`businesses/byWorkerKey/${workerId}/${key}`);
    }

    getBusinessesByPage(pageIndex: number, pageSize: number, params: Params): Observable<BusinessModel[]> {
        return this.httpService.get(`businesses/byPage/${pageIndex}/${pageSize}`, params);
    }

    getBusinessesByWorkerPage(workerId: string, pageIndex: number, pageSize: number): Observable<BusinessModel[]> {
        return this.httpService.get(`businesses/byWorkerPage/${workerId}/${pageIndex}/${pageSize}`);
    }

    getCountBusinesses(params: Params): Observable<number> {
        return this.httpService.get('businesses/countBusinesses', params);
    }

    getCountBusinessesByWorker(workerId: string): Observable<number> {
        return this.httpService.get(`businesses/countBusinessesByWorker/${workerId}`);
    }

    create(
        business: BusinessModel,
        guaranties: GuarantiesModel[],
        experiences: ExperienceModel[],
        investments: InvestmentModel[],
        properties: PropertyModel[],
        movableProperties: MovablePropertyModel[],
        facilityCredits: FacilityCreditModel[],
    ): Observable<BusinessModel> {
        return this.httpService.post('businesses', {
            business,
            guaranties,
            experiences,
            investments,
            properties,
            facilityCredits,
            movableProperties,
        });
    }

    update(
        business: BusinessModel,
        guaranties: GuarantiesModel[],
        experiences: ExperienceModel[],
        investments: InvestmentModel[],
        properties: PropertyModel[],
        movableProperties: MovablePropertyModel[],
        facilityCredits: FacilityCreditModel[],
        businessId: string
    ): Observable<void> {
        return this.httpService.put(`businesses/${businessId}`, {
            business,
            guaranties,
            experiences,
            investments,
            properties,
            facilityCredits,
            movableProperties,
        });
    }

    delete(businessId: string) {
        return this.httpService.delete(`businesses/${businessId}`);
    }

    restore(businessId: string) {
        return this.httpService.get(`businesses/restore/${businessId}`);
    }

    getBusinessNodesByTypeBusiness(type: string, businessId: string): Observable<BusinessNodeModel[]> {
        return this.httpService.get(`businessNodes/byTypeBusiness/${type}/${businessId}`);
    }

    uploadFile(
        formData: FormData,
    ): Observable<any> {
        return this.httpService.postProgress(`businessNodes/uploadFile`, formData);
    }

    createNode(businessNode: any): Observable<BusinessModel> {
        return this.httpService.post('businessNodes', { businessNode });
    }

    updateNode(businessNode: any, businessNodeId: string): Observable<void> {
        return this.httpService.put(`businessNodes/${businessNodeId}`, { businessNode });
    }

    deleteNode(businessNodeId: string): Observable<void> {
        return this.httpService.delete(`businessNodes/${businessNodeId}`);
    }

}
