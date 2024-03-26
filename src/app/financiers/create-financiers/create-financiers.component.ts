import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BanksService } from 'src/app/banks/banks.service';
import { CompaniesService } from 'src/app/companies/companies.service';
import { CompanyModel } from 'src/app/companies/company.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BankModel } from 'src/app/providers/bank.model';
import { FinancierModelsService } from '../financiers.service';

@Component({
    selector: 'app-create-financiers',
    templateUrl: './create-financiers.component.html',
    styleUrls: ['./create-financiers.component.sass']
})
export class CreateFinancierModelsComponent implements OnInit {

    constructor(
        private readonly financiersService: FinancierModelsService,
        private readonly navigationService: NavigationService,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly router: Router,
        private readonly banksService: BanksService,
        private readonly companiesService: CompaniesService,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        document: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        name: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        mobileNumber: null,
        phoneNumber: null,
        annexed: null,
    });

    isLoading: boolean = false;
    banks: BankModel[] = [];
    companies: CompanyModel[] = [];

    private handleCompanies$: Subscription = new Subscription();
    private handleBanks$: Subscription = new Subscription();

    ngOnDestroy() {
        this.handleCompanies$.unsubscribe();
        this.handleBanks$.unsubscribe();
    }

    ngOnInit(): void {
        this.handleBanks$ = this.banksService.handleBanks().subscribe(banks => {
            this.banks = banks;
        });

        this.handleCompanies$ = this.companiesService.handleCompanies().subscribe(companies => {
            this.companies = companies;
        });

        this.navigationService.setTitle('Nueva financiera');
    }

    async onSubmit() {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadBarStart();
            this.financiersService.create(this.formGroup.value).subscribe(res => {
                console.log(res);
                this.isLoading = false;
                this.navigationService.loadBarFinish();
                this.router.navigate(['/financiers']);
                this.navigationService.showMessage('Registrado correctamente');
            }, (error: HttpErrorResponse) => {
                this.isLoading = false;
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage(error.error.message);
            });
        }
    }
}
