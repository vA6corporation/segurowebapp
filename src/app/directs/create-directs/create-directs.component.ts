import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DirectsService } from '../directs.service';
import { DialogChequesComponent } from 'src/app/cheques/dialog-cheques/dialog-cheques.component';
import { DialogDepositsComponent } from 'src/app/deposits/dialog-deposits/dialog-deposits.component';
import { WorkersService } from 'src/app/workers/workers.service';
import { WorkerModel } from 'src/app/workers/worker.model';
import { Subscription } from 'rxjs';
import { DialogConstructionsComponent } from 'src/app/constructions/dialog-constructions/dialog-constructions.component';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
import { ConstructionsService } from 'src/app/constructions/constructions.service';
import { BeneficiaryModel } from 'src/app/beneficiaries/beneficiary.model';
import { BusinessModel } from 'src/app/businesses/business.model';
import { ChequeModel } from 'src/app/cheques/cheque.model';
import { DepositModel } from 'src/app/deposits/deposit.model';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { BankModel } from 'src/app/providers/bank.model';
import { CompanyModel } from 'src/app/companies/company.model';
import { BanksService } from 'src/app/banks/banks.service';
import { CompaniesService } from 'src/app/companies/companies.service';
import { DialogBrokersComponent } from 'src/app/brokers/dialog-brokers/dialog-brokers.component';

@Component({
    selector: 'app-create-directs',
    templateUrl: './create-directs.component.html',
    styleUrls: ['./create-directs.component.sass']
})
export class CreateDirectsComponent implements OnInit {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly directsService: DirectsService,
        private readonly navigationService: NavigationService,
        private readonly workersService: WorkersService,
        private readonly constructionsService: ConstructionsService,
        private readonly matDialog: MatDialog,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly companiesService: CompaniesService,
        private readonly banksService: BanksService,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        financier: this.formBuilder.group({
            name: [null, Validators.required],
            _id: [null, Validators.required],
        }),
        broker: this.formBuilder.group({
            name: [null, Validators.required],
            _id: [null, Validators.required],
        }),
        direct: this.formBuilder.group({
            constructionId: '',
            policyNumber: [null, Validators.required],
            price: [null, Validators.required],
            pagare: null,
            observations: null,
            startDate: [null, Validators.required],
            endDate: [null, Validators.required],
            guarantee: null,
            prima: null,
            commission: null,
            currencyCode: 'PEN',
            companyId: ['', Validators.required],
            bankId: ['', Validators.required],
        }),
    });

    construction: ConstructionModel | null = null;
    business: BusinessModel | null = null;
    partnership: PartnershipModel | null = null;
    worker: WorkerModel | null = null;
    beneficiary: BeneficiaryModel | null = null;
    isLoading: boolean = false;
    cheques: ChequeModel[] = [];
    deposits: DepositModel[] = [];
    workers: WorkerModel[] = [];
    banks: BankModel[] = [];
    companies: CompanyModel[] = [];

    private handleCompanies$: Subscription = new Subscription();
    private handleBanks$: Subscription = new Subscription();
    private handleWorkers$: Subscription = new Subscription();
    private queryParams$: Subscription = new Subscription();

    ngOnDestroy() {
        this.handleCompanies$.unsubscribe();
        this.handleBanks$.unsubscribe();
        this.handleWorkers$.unsubscribe();
        this.queryParams$.unsubscribe();
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Nuevo adelanto directo');
        this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
            this.workers = workers;
        });

        this.handleBanks$ = this.banksService.handleBanks().subscribe(banks => {
            this.banks = banks;
        });

        this.handleCompanies$ = this.companiesService.handleCompanies().subscribe(companies => {
            this.companies = companies;
        });

        this.queryParams$ = this.activatedRoute.queryParams.subscribe(params => {
            if (params.constructionId) {
                this.constructionsService.getConstructionById(params.constructionId).subscribe(construction => {
                    if (construction) {
                        this.construction = construction;
                        this.business = construction.business;
                        this.partnership = construction.partnership;
                        this.worker = construction.worker;
                        this.beneficiary = construction.beneficiary;
                        this.formGroup.patchValue({ material: { constructionId: construction._id } });
                    }
                });
            }
        });
    }

    onEditConstruction() {
        const dialogRef = this.matDialog.open(DialogConstructionsComponent, {
            width: '100vw',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(construction => {
            if (construction) {
                this.construction = construction;
                this.business = construction.business;
                this.partnership = construction.partnership;
                this.worker = construction.worker;
                this.beneficiary = construction.beneficiary;
                this.formGroup.patchValue({ direct: { constructionId: construction._id } });
            }
        });
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

    removeCheque(index: number): void {
        this.cheques.splice(index, 1);
    }

    removeDeposit(index: number): void {
        this.deposits.splice(index, 1);
    }

    openDialogBusinesses() {
        const dialogRef = this.matDialog.open(DialogBusinessesComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(business => {
            if (business) {
                this.formGroup.patchValue({ business });
            }
        });
    }

    openDialogFinanciers() {
        const dialogRef = this.matDialog.open(DialogFinanciesComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(financier => {
            if (financier) {
                this.formGroup.patchValue({ financier });
            }
        });
    }

    openDialogBeneficiaries() {
        const dialogRef = this.matDialog.open(DialogBeneficiariesComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(beneficiary => {
            if (beneficiary) {
                this.formGroup.patchValue({ beneficiary });
            }
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

    openDialogCheques() {
        const dialogRef = this.matDialog.open(DialogChequesComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(cheque => {
            if (cheque) {
                this.cheques.push(cheque);
            }
        });
    }

    openDialogDeposits() {
        const dialogRef = this.matDialog.open(DialogDepositsComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(deposit => {
            if (deposit) {
                this.deposits.push(deposit);
            }
        });
    }

    onSubmit(): void {
        if (this.formGroup.valid && this.construction) {
            this.isLoading = true;
            this.navigationService.loadBarStart();
            const { financier, direct, broker } = this.formGroup.value;
            direct.partnershipId = this.partnership?._id;
            direct.businessId = this.business?._id;
            direct.beneficiaryId = this.beneficiary?._id;
            direct.financierId = financier._id;
            direct.brokerId = broker._id
            direct.workerId = this.worker?._id;
            direct.constructionId = this.construction?._id;
            this.directsService.create(direct, this.cheques, this.deposits, this.construction.officeId).subscribe({
                next: () => {
                    this.isLoading = false;
                    this.navigationService.loadBarFinish();
                    this.router.navigate(['/directs']);
                    this.navigationService.showMessage('Registrado correctamente');
                }, error: (error: HttpErrorResponse) => {
                    this.isLoading = false;
                    this.navigationService.loadBarFinish();
                    this.navigationService.showMessage(error.error.message);
                }
            });
        }
    }
}
