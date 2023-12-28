import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BankModel } from 'src/app/providers/bank.model';
import { UserModel } from 'src/app/users/user.model';
import { BanksService } from '../banks.service';

@Component({
    selector: 'app-banks',
    templateUrl: './banks.component.html',
    styleUrls: ['./banks.component.sass']
})
export class BanksComponent implements OnInit {

    constructor(
        private readonly banksService: BanksService,
        private readonly navigationService: NavigationService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly formBuilder: FormBuilder,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        startDate: [new Date(), Validators.required],
        endDate: [new Date(), Validators.required],
    })
    users: UserModel[] = [];
    displayedColumns: string[] = ['providerName', 'bankName', 'accountNumber', 'accountType', 'currencyType', 'totalCharge', 'actions'];
    dataSource: BankModel[] = [];
    length: number = 0;
    pageSize: number = 10;
    pageSizeOptions: number[] = [10, 30, 50];
    pageIndex: number = 0;

    ngOnInit(): void {
        this.navigationService.setTitle('Cuentas bancarias');
        this.fetchData();
    }

    handlePageEvent(event: PageEvent): void {
        // this.navigationService.loadBarStart();
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;

        const queryParams: Params = { pageIndex: this.pageIndex, pageSize: this.pageSize };

        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: queryParams,
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        });
    }

    fetchData() {
        this.navigationService.loadBarFinish();
        const { startDate, endDate } = this.formGroup.value
        this.banksService.getBanksWithPayments(startDate, endDate).subscribe(banks => {
            console.log(banks);
            
            this.dataSource = banks;
            this.navigationService.loadBarFinish();
        });
    }

    onRangeChange() {
        if (this.formGroup.valid) {
            this.fetchData();
        }
    }

}
