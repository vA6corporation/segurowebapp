import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BanksService } from 'src/app/banks/banks.service';
import { CompaniesService } from 'src/app/companies/companies.service';
import { CompanyModel } from 'src/app/companies/company.model';
import { DialogSelectPdfComponent, DialogSelectPdfData } from 'src/app/insurances/dialog-select-pdf/dialog-select-pdf.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BankModel } from 'src/app/providers/bank.model';
import { DialogCreateProvidersComponent } from 'src/app/providers/dialog-create-providers/dialog-create-providers.component';
import { DialogEditProvidersComponent } from 'src/app/providers/dialog-edit-providers/dialog-edit-providers.component';
import { DialogProvidersComponent } from 'src/app/providers/dialog-providers/dialog-providers.component';
import { ProviderModel } from 'src/app/providers/provider.model';
import { PaymentOrdersService } from '../payment-orders.service';

@Component({
    selector: 'app-create-payment-orders',
    templateUrl: './create-payment-orders.component.html',
    styleUrls: ['./create-payment-orders.component.sass']
})
export class CreatePaymentOrdersComponent implements OnInit {

    constructor(
        private readonly paymentOrdersService: PaymentOrdersService,
        private readonly navigationService: NavigationService,
        private readonly companiesService: CompaniesService,
        private readonly banksService: BanksService,
        private readonly formBuilder: UntypedFormBuilder,
        private readonly matDialog: MatDialog,
        private readonly router: Router,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        companyId: ['', Validators.required],
        concept: [null, Validators.required],
        charge: [null, Validators.required],
        currencyCode: 'PEN',
        observations: null,
        paymentAt: [new Date(), Validators.required],
        bankId: null,
        providerBankId: null,
        isPaid: true,
    });
    private pdfs: DialogSelectPdfData[] = [];
    isLoading: boolean = false;
    provider: ProviderModel | null = null;
    banks: BankModel[] = [];
    providerBanks: BankModel[] = [];
    companies: CompanyModel[] = [];

    private handleClickMenu$: Subscription = new Subscription();
    private handleCompanies$: Subscription = new Subscription();
    private handleBanks$: Subscription = new Subscription();

    ngOnDestroy() {
        this.handleClickMenu$.unsubscribe();
        this.handleCompanies$.unsubscribe();
        this.handleBanks$.unsubscribe();
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Nueva orden de pago');

        this.handleBanks$ = this.banksService.handleBanks().subscribe(banks => {
            this.banks = banks;
        });

        this.handleCompanies$ = this.companiesService.handleCompanies().subscribe(companies => {
            this.companies = companies;
        });

        this.navigationService.setMenu([
            // { id: 'attach_file', label: 'Adjuntar PDF', icon: 'attach_file', show: true },
            { id: 'add_provider', label: 'Agregar proveedor', icon: 'person_add', show: true },
        ]);

        this.handleClickMenu$ = this.navigationService.handleClickMenu().subscribe(id => {
            switch (id) {
                case 'add_provider':
                    const dialogRef = this.matDialog.open(DialogProvidersComponent, {
                        width: '600px',
                        position: { top: '20px' },
                    });

                    dialogRef.afterClosed().subscribe(provider => {
                        if (provider) {
                            this.provider = provider;
                            this.providerBanks = provider.banks;
                        }
                    });

                    dialogRef.componentInstance.handleAddProvider().subscribe(() => {
                        const dialogRef = this.matDialog.open(DialogCreateProvidersComponent, {
                            width: '600px',
                            position: { top: '20px' },
                        });

                        dialogRef.afterClosed().subscribe(provider => {
                            if (provider) {
                                this.provider = provider;
                                this.providerBanks = provider.banks;
                            }
                        });
                    });
                    break;
            }
        });
    }

    onAttachPdf() {
        const dialogRef = this.matDialog.open(DialogSelectPdfComponent, {
            width: '100vw',
            height: '90vh',
            position: { top: '20px' },
            data: this.pdfs
        });

        dialogRef.componentInstance.handleSelectedFile().subscribe(files => {
            this.pdfs = files;
        });
    }

    onEditProvider() {
        const dialogRef = this.matDialog.open(DialogEditProvidersComponent, {
            width: '600px',
            position: { top: '20px' },
            data: this.provider,
        });

        dialogRef.afterClosed().subscribe(provider => {
            if (provider) {
                this.provider = provider;
                this.providerBanks = provider.banks;
            }
        });
    }

    uploadFile(file: File, paymentOrderId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', file),
                this.paymentOrdersService.uploadFile(formData, paymentOrderId).subscribe(pdfId => {
                    resolve();
                }, (error: HttpErrorResponse) => {
                    reject();
                });
        });
    }

    onSubmit(): void {
        if (this.provider === null) {
            this.navigationService.showMessage('Agrege un proveedor');
        } else {

            if (this.formGroup.valid) {
                this.isLoading = true;
                this.navigationService.loadSpinnerStart();
                const createdPaymentOrder = {
                    ...this.formGroup.value,
                    providerId: this.provider._id,
                }
                this.paymentOrdersService.create(createdPaymentOrder).subscribe(async paymentOrder => {
                    if (this.pdfs.length) {
                        for (const pdf of this.pdfs) {
                            await this.uploadFile(pdf.file, paymentOrder._id);
                        }
                        this.isLoading = false;
                        this.router.navigate(['/paymentOrders']);
                        this.navigationService.loadSpinnerFinish();
                        this.navigationService.showMessage('Registrado correctamente');
                    } else {
                        this.isLoading = false;
                        this.router.navigate(['/paymentOrders']);
                        this.navigationService.loadSpinnerFinish();
                        this.navigationService.showMessage('Registrado correctamente');
                    }
                }, (error: HttpErrorResponse) => {
                    this.isLoading = false;
                    this.navigationService.loadSpinnerFinish();
                    this.navigationService.showMessage(error.error.message);
                });
            }

        }
    }

}
