import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpService } from '../http.service';
import { BankModel } from '../providers/bank.model';

@Injectable({
    providedIn: 'root'
})
export class BanksService {

    constructor(
        private readonly httpService: HttpService,
    ) { }

    private banks: BankModel[] = [];
    private banks$: Subject<BankModel[]> = new Subject();

    getBankById(bankId: string): Observable<BankModel> {
        return this.httpService.get(`banks/byId/${bankId}`);
    }

    getBanks(): Observable<BankModel[]> {
        return this.httpService.get('banks');
    }

    getBanksWithPayments(startDate: Date, endDate: string): Observable<BankModel[]> {
        return this.httpService.get(`banks/withPayments/${startDate}/${endDate}`);
    }

    handleBanks(): Observable<BankModel[]> {
        if (this.banks.length) {
            setTimeout(() => {
                this.banks$.next(this.banks);
            });
        } else {
            this.getBanks().subscribe(banks => {
                this.banks = banks;
                this.banks$.next(this.banks);
            });
        }
        return this.banks$.asObservable();
    }

    create(bank: BankModel): Observable<BankModel> {
        return this.httpService.post('banks', { bank });
    }

    update(bank: BankModel, bankId: string): Observable<void> {
        return this.httpService.put(`banks/${bankId}`, { bank });
    }

}
