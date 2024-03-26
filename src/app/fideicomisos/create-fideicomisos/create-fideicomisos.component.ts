import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BanksService } from 'src/app/banks/banks.service';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogBrokersComponent } from 'src/app/brokers/dialog-brokers/dialog-brokers.component';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { CompaniesService } from 'src/app/companies/companies.service';
import { CompanyModel } from 'src/app/companies/company.model';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { BankModel } from 'src/app/providers/bank.model';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { FideicomisosService } from '../fideicomisos.service';
import { DialogCustomersComponent } from 'src/app/customers/dialog-customers/dialog-customers.component';
import { DialogCreateCustomersComponent } from 'src/app/customers/dialog-create-customers/dialog-create-customers.component';

@Component({
    selector: 'app-create-fideicomisos',
    templateUrl: './create-fideicomisos.component.html',
    styleUrls: ['./create-fideicomisos.component.sass']
})
export class CreateFideicomisosComponent implements OnInit {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly fideicomisosService: FideicomisosService,
        private readonly navigationService: NavigationService,
        private readonly workersService: WorkersService,
        private readonly companiesService: CompaniesService,
        private readonly router: Router,
        private readonly matDialog: MatDialog,
        private readonly banksService: BanksService,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        customer: this.formBuilder.group({
            name: [null, Validators.required],
            partnershipName: '',
            _id: [null, Validators.required],
        }),
        financier: this.formBuilder.group({
            name: [null, Validators.required],
            _id: [null, Validators.required],
        }),
        worker: this.formBuilder.group({
            _id: [null, Validators.required]
        }),
        constructionName: [null, Validators.required],
        days: [null, Validators.required],
        emitionAt: [null, Validators.required],
        charge: [null, Validators.required],
        commission: null,
    });

    construction: ConstructionModel | null = null;
    isLoading: boolean = false;
    workers: WorkerModel[] = [];
    banks: BankModel[] = [];
    companies: CompanyModel[] = [];

    private handleCompanies$: Subscription = new Subscription();
    private handleBanks$: Subscription = new Subscription();
    private handleWorkers$: Subscription = new Subscription();

    ngOnDestroy() {
        this.handleWorkers$.unsubscribe();
        this.handleBanks$.unsubscribe();
        this.handleCompanies$.unsubscribe();
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Nuevo fideicomiso');

        this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
            this.workers = workers;
        });

        this.handleBanks$ = this.banksService.handleBanks().subscribe(banks => {
            this.banks = banks;
        });

        this.handleCompanies$ = this.companiesService.handleCompanies().subscribe(companies => {
            this.companies = companies;
        });
    }

    openDialogCustomers() {
        const dialogRef = this.matDialog.open(DialogCustomersComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(customer => {
            if (customer) {
                this.formGroup.patchValue({ customer });
            }
        })

        dialogRef.componentInstance.handleCreateCustomer().subscribe(() => {
            const dialogRef = this.matDialog.open(DialogCreateCustomersComponent, {
                width: '600px',
                position: { top: '20px' }
            })

            dialogRef.afterClosed().subscribe(customer => {
                if (customer) {
                    this.formGroup.patchValue({ customer })
                }
            })
        })
    }

    openDialogBrokers() {
        const dialogRef = this.matDialog.open(DialogBrokersComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(broker => {
            this.formGroup.patchValue({ broker: broker || {} });
        });
    }

    openDialogFinanciers() {
        const dialogRef = this.matDialog.open(DialogFinanciesComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(financier => {
            this.formGroup.patchValue({ financier: financier || {} });
        });
    }

    openDialogBeneficiaries() {
        const dialogRef = this.matDialog.open(DialogBeneficiariesComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(beneficiary => {
            this.formGroup.patchValue({ beneficiary: beneficiary || {} });
        });
    }

    openDialogPartnerships() {
        const dialogRef = this.matDialog.open(DialogPartnershipsComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(partnership => {
            if (partnership) {
                const { business } = partnership;
                this.formGroup.patchValue({ business: business || {} });
                this.formGroup.patchValue({ partnership: partnership || {} });
            }
        });
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadBarStart();
            const { customer, financier, worker, ...fideicomiso } = this.formGroup.value;
            fideicomiso.customerId = customer._id;
            fideicomiso.financierId = financier._id;
            fideicomiso.workerId = worker._id;
            this.fideicomisosService.create(fideicomiso).subscribe(fideicomiso => {
                this.isLoading = false;
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage('Registrado correctamente');
                this.router.navigate(['/fideicomisos']);
            }, (error: HttpErrorResponse) => {
                this.isLoading = false;
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage(error.error.message);
            });
        }
    }

}
