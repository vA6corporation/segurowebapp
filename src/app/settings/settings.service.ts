import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http.service';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    public save(business: any, office: any): Observable<void> {
        return this.httpService.put('businesses', { business, office });
    }

    public updateLogo(logo: string) {
        return this.httpService.put('settings/updateLogo', { logo });
    }

    public deleteLogo(officeId: string) {
        return this.httpService.delete(`settings/deleteLogo/${officeId}`)
    }

    public saveCertificate(formData: FormData) {
        return this.httpService.postForm('certificates', formData);
    }

    public getCertificates(): Observable<any[]> {
        return this.httpService.get('certificates');
    }

    public deleteCertificate(certificateId: string) {
        return this.httpService.delete(`certificates/${certificateId}`);
    }

    public saveList(name: string): Observable<void> {
        return this.httpService.post('priceLists', { name });
    }

    public updatePriceList(name: string, priceListId: string): Observable<void> {
        return this.httpService.put(`priceLists/${priceListId}`, { name });
    }

    public deletePriceList(priceListId: string): Observable<void> {
        return this.httpService.delete(`priceLists/${priceListId}`);
    }

    public updateCertificate(certificateId: string) {
        return this.httpService.get(`businesses/updateCertificate/${certificateId}`);
    }
}
