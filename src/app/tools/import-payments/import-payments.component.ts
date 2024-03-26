import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { BanksService } from 'src/app/banks/banks.service';
import { CompaniesService } from 'src/app/companies/companies.service';
import { CompanyModel } from 'src/app/companies/company.model';
import { MaterialModule } from 'src/app/material.module';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { PaymentsService } from 'src/app/payments/payments.service';
import { BankModel } from 'src/app/providers/bank.model';
import { parseExcel } from 'src/app/xlsx';

@Component({
    selector: 'app-import-payments',
    standalone: true,
    imports: [MaterialModule, ReactiveFormsModule],
    templateUrl: './import-payments.component.html',
    styleUrl: './import-payments.component.sass'
})
export class ImportPaymentsComponent {

    constructor(
        private readonly navigationService: NavigationService,
        private readonly paymentsService: PaymentsService,
        private readonly banksService: BanksService,
        private readonly companiesService: CompaniesService,
        private readonly formBuilder: FormBuilder,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        bankId: ['', Validators.required],
        companyId: ['', Validators.required]
    })
    displayedColumns: string[] = ['parentId', 'commission', 'policyNumber', 'guaranteeType', 'actions'];
    dataSource: any[] = [];
    length: number = 0;
    pageSize: number = 10;
    pageSizeOptions: number[] = [10, 30, 50];
    pageIndex: number = 0;
    isLoading: boolean = false;
    banks: BankModel[] = []
    companies: CompanyModel[] = []

    private handleBanks$: Subscription = new Subscription()
    private handleCompanies$: Subscription = new Subscription()

    ngOnDestroy() {
        this.handleBanks$.unsubscribe()
        this.handleCompanies$.unsubscribe()
    }

    ngOnInit() {
        this.navigationService.setTitle('Importar pagos')

        this.handleBanks$ = this.banksService.handleBanks().subscribe(banks => {
            this.banks = banks
        })

        this.handleCompanies$ = this.companiesService.handleCompanies().subscribe(companies => {
            this.companies = companies
        })
    }

    async onFileSelected(files: FileList | null, input: HTMLInputElement, table: MatTable<any>) {
        if (files && files[0]) {
            const guaranties = await parseExcel(files[0]);
            input.value = '';
            this.dataSource = [];
            for (let index = 0; index < guaranties.length; index++) {
                const guarantee = guaranties[index];
                if (!guarantee._id || !guarantee['COMISION'] || !guarantee['GARANTIA']) {
                    this.dataSource = []
                    alert(`La fina N° ${index + 1} no cumple con los datos requeridos`)
                    break
                } else {
                    this.dataSource.push({
                        parentId: guarantee._id,
                        commission: guarantee['COMISION'],
                        policyNumber: guarantee['N° DE POLIZA'],
                        guaranteeType: guarantee['GARANTIA']
                    })
                }
            }
            table.renderRows();
        }
    }

    onDeleteCustomer(index: number, table: MatTable<any>) {
        this.dataSource.splice(index, 1);
        table.renderRows();
    }

    onSubmit() {
        if (this.formGroup.valid) {
            const { bankId, companyId } = this.formGroup.value
            this.navigationService.loadBarStart()
            this.isLoading = true
            this.navigationService.loadBarStart()
            this.paymentsService.importPayments(this.dataSource, bankId, companyId).subscribe(() => {
                this.navigationService.showMessage('Se han guardado los cambios')
                this.navigationService.loadBarFinish()
                this.dataSource = []
                this.isLoading = false
            })
        }
    }

}
