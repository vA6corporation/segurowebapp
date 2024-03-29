import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BanksService } from 'src/app/banks/banks.service';
import { ChequeModel } from 'src/app/cheques/cheque.model';
import { CompaniesService } from 'src/app/companies/companies.service';
import { CompanyModel } from 'src/app/companies/company.model';
import { BankModel } from 'src/app/providers/bank.model';

@Component({
    selector: 'app-dialog-create-payments',
    templateUrl: './dialog-create-payments.component.html',
    styleUrls: ['./dialog-create-payments.component.sass']
})
export class DialogCreatePaymentsComponent implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        readonly data: ChequeModel | null,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly banksService: BanksService,
        private readonly companiesService: CompaniesService,
        private readonly dialogRef: MatDialogRef<DialogCreatePaymentsComponent>,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        charge: [null, Validators.required],
        paymentAt: [new Date(), Validators.required],
        bankId: ['', Validators.required],
        companyId: ['', Validators.required],
    });
    banks: BankModel[] = []
    companies: CompanyModel[] = []

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

        this.companiesService.handleCompanies().subscribe(companies => {
            this.companies = companies;
        });
    }

    onSubmit() {
        if (this.formGroup.valid) {
            this.dialogRef.close(this.formGroup.value);
        }
    }

}
