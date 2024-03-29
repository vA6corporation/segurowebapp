import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BanksService } from 'src/app/banks/banks.service';
import { CompaniesService } from 'src/app/companies/companies.service';
import { CompanyModel } from 'src/app/companies/company.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BankModel } from 'src/app/providers/bank.model';
import { FinancierModelsService } from '../financiers.service';

@Component({
    selector: 'app-edit-financiers',
    templateUrl: './edit-financiers.component.html',
    styleUrls: ['./edit-financiers.component.sass']
})
export class EditFinancierModelsComponent implements OnInit {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly financiersService: FinancierModelsService,
        private readonly navigationService: NavigationService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly banksService: BanksService,
        private readonly companiesService: CompaniesService,
    ) { }

    public formGroup: UntypedFormGroup = this.formBuilder.group({
        document: [null, Validators.required],
        name: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        mobileNumber: null,
        phoneNumber: null,
        annexed: null,
    });

    public isLoading: boolean = false;
    public banks: BankModel[] = [];
    public companies: CompanyModel[] = [];
    private financierId: string = '';

    private handleCompanies$: Subscription = new Subscription();
    private handleBanks$: Subscription = new Subscription();

    ngOnDestroy() {
        this.handleCompanies$.unsubscribe();
        this.handleBanks$.unsubscribe();
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Editar financiera');
        this.handleBanks$ = this.banksService.handleBanks().subscribe(banks => {
            this.banks = banks;
        });

        this.handleCompanies$ = this.companiesService.handleCompanies().subscribe(companies => {
            this.companies = companies;
        });

        this.activatedRoute.params.subscribe(async params => {
            this.financierId = params.financierId;
            this.financiersService.getFinancierModelById(this.financierId).subscribe(financier => {
                this.formGroup.patchValue(financier);
            });
        });
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadBarStart();
            this.financiersService.update(this.formGroup.value, this.financierId).subscribe(res => {
                this.isLoading = false;
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage('Se han guardado los cambios');
            }, (error: HttpErrorResponse) => {
                this.isLoading = false;
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage(error.error.message);
            });
        }
    }
}
