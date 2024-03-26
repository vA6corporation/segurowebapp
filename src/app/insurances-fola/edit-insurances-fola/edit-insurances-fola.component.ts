import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { InsurancesFolaService } from '../insurances-fola.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { WorkersService } from 'src/app/workers/workers.service';
import { OfficesService } from 'src/app/offices/offices.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { WorkerModel } from 'src/app/workers/worker.model';
import { OfficeModel } from 'src/app/auth/office.model';
import { BankModel } from 'src/app/providers/bank.model';
import { CompanyModel } from 'src/app/companies/company.model';
import { PaymentModel } from 'src/app/payments/payment.model';
import { UserModel } from 'src/app/users/user.model';
import { Subscription } from 'rxjs';
import { DialogPaymentsComponent } from 'src/app/payments/dialog-payments/dialog-payments.component';
import { HttpErrorResponse } from '@angular/common/http';
import { SheetConstructionsComponent } from 'src/app/insurances/sheet-constructions/sheet-constructions.component';
import { DialogConstructionsComponent } from 'src/app/constructions/dialog-constructions/dialog-constructions.component';
import { DialogInsuranceConstructionsComponent } from 'src/app/insurance-constructions/dialog-insurance-constructions/dialog-insurance-constructions.component';
import { DialogInsuranceBusinessesComponent } from 'src/app/insurance-businesses/dialog-insurance-businesses/dialog-insurance-businesses.component';
import { DialogBrokersComponent } from 'src/app/brokers/dialog-brokers/dialog-brokers.component';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogInsurancePartnershipsComponent } from 'src/app/insurance-partnerships/dialog-insurance-partnerships/dialog-insurance-partnerships.component';
import { DialogAttachPdfComponent, InsurancePdfData } from 'src/app/insurances/dialog-attach-pdf/dialog-attach-pdf.component';
import { DialogCreateFeesComponent } from 'src/app/fees/dialog-create-fees/dialog-create-fees.component';
import { FeeModel } from 'src/app/fees/fee.model';

@Component({
    selector: 'app-edit-insurances-fola',
    templateUrl: './edit-insurances-fola.component.html',
    styleUrl: './edit-insurances-fola.component.sass'
})
export class EditInsurancesFolaComponent {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly insurancesFolaService: InsurancesFolaService,
        private readonly navigationService: NavigationService,
        private readonly workersService: WorkersService,
        private readonly officesService: OfficesService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly authService: AuthService,
        private readonly matDialog: MatDialog,
        private readonly matBottomSheet: MatBottomSheet,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        construction: this.formBuilder.group({
            object: null,
            onModel: null,
            _id: null,
        }),
        partnership: this.formBuilder.group({
            _id: null,
            name: null,
        }),
        business: this.formBuilder.group({
            name: [null, Validators.required],
            _id: [null, Validators.required],
        }),
        broker: this.formBuilder.group({
            name: [null, Validators.required],
            _id: [null, Validators.required],
        }),
        financier: this.formBuilder.group({
            name: [null, Validators.required],
            _id: [null, Validators.required],
        }),
        invoiceNumber: '',
        proformaNumber: '',
        observations: '',
        policyNumber: [null, Validators.required],
        expirationAt: [null, Validators.required],
        emitionAt: [null, Validators.required],
        charge: [null, Validators.required],
        prima: null,
        commission: null,
        currencyCode: 'PEN',
        isPaid: false,
        isEmition: false,
        officeId: '',
        workerId: ['', Validators.required],
    });

    construction: ConstructionModel | null = null;
    isLoading: boolean = false;
    workers: WorkerModel[] = [];
    offices: OfficeModel[] = [];
    banks: BankModel[] = [];
    companies: CompanyModel[] = [];
    payments: PaymentModel[] = [];
    fees: FeeModel[] = []
    user: UserModel | null = null;
    private insuranceFolaId: string = '';

    private handleAuth$: Subscription = new Subscription();
    private handleWorkers$: Subscription = new Subscription();
    private handleOffices$: Subscription = new Subscription();

    ngOnDestroy() {
        this.handleAuth$.unsubscribe();
        this.handleWorkers$.unsubscribe();
        this.handleOffices$.unsubscribe();
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Editar seguro');

        this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
            this.workers = workers;
        });

        this.handleOffices$ = this.officesService.handleOffices().subscribe(offices => {
            this.offices = offices;
        });

        this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
            this.user = auth.user;
        });

        this.activatedRoute.params.subscribe(params => {
            this.insuranceFolaId = params.insuranceFolaId
            this.insurancesFolaService.getInsuranceFolaById(this.insuranceFolaId).subscribe(insuranceFola => {
                this.payments = insuranceFola.payments
                this.formGroup.patchValue(insuranceFola)
            });
        });
    }

    onDialogPayments() {
        const dialogRef = this.matDialog.open(DialogPaymentsComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(payment => {
            if (payment) {
                this.payments.push(payment);
            }
        });
    }

    onRemovePayment(index: number) {
        this.payments.splice(index, 1);
    }

    onDialogFees() {
        const dialogRef = this.matDialog.open(DialogCreateFeesComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(fee => {
            if (fee) {
                this.fees.push(fee);
            }
        })
    }

    onRemoveFee(index: number) {
        this.fees.splice(index, 1);
    }

    onChangeOffice() {
        if (this.formGroup.valid) {
            this.navigationService.loadBarStart();
            const { insurance } = this.formGroup.value;
            this.insurancesFolaService.updateOffice(this.insuranceFolaId, insurance.officeId).subscribe(() => {
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage('Se han guardado los cambios');
            }, (error: HttpErrorResponse) => {
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage(error.error.message);
            });
        }
    }

    openDialogConstruction() {
        const matBottomRef = this.matBottomSheet.open(SheetConstructionsComponent);
        matBottomRef.instance.onDialogOne.subscribe(() => {
            const dialogRef = this.matDialog.open(DialogConstructionsComponent, {
                width: '100vw',
                position: { top: '20px' }
            });

            dialogRef.afterClosed().subscribe(construction => {
                if (construction) {
                    this.formGroup.patchValue({ construction });
                }
            });
        });

        matBottomRef.instance.onDialogTwo.subscribe(() => {
            const dialogRef = this.matDialog.open(DialogInsuranceConstructionsComponent, {
                width: '100vw',
                position: { top: '20px' }
            });

            dialogRef.afterClosed().subscribe(construction => {
                if (construction) {
                    this.formGroup.patchValue({ construction });
                }
            });
        });
    }

    openDialogBusinesses() {
        const dialogRef = this.matDialog.open(DialogInsuranceBusinessesComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(business => {
            if (business) {
                this.formGroup.patchValue({ business });
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
        const dialogRef = this.matDialog.open(DialogInsurancePartnershipsComponent, {
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

    onAttachPdfPolicy() {
        const data: InsurancePdfData = {
            type: 'POLICY',
            insuranceId: this.insuranceFolaId,
        }

        this.matDialog.open(DialogAttachPdfComponent, {
            width: '100vw',
            height: '90vh',
            position: { top: '20px' },
            data,
        });
    }

    onAttachPdfInvoice() {
        const data: InsurancePdfData = {
            type: 'INVOICE',
            insuranceId: this.insuranceFolaId,
        }

        this.matDialog.open(DialogAttachPdfComponent, {
            width: '100vw',
            height: '90vh',
            position: { top: '20px' },
            data,
        });
    }

    onAttachPdfVoucher() {
        const data: InsurancePdfData = {
            type: 'VOUCHER',
            insuranceId: this.insuranceFolaId,
        }

        this.matDialog.open(DialogAttachPdfComponent, {
            width: '100vw',
            height: '90vh',
            position: { top: '20px' },
            data,
        });
    }

    onAttachPdfDocuments() {
        const data: InsurancePdfData = {
            type: 'DOCUMENT',
            insuranceId: this.insuranceFolaId,
        }

        this.matDialog.open(DialogAttachPdfComponent, {
            width: '100vw',
            height: '90vh',
            position: { top: '20px' },
            data,
        });
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadBarStart();
            const { business, financier, broker, partnership, construction, ...insurance } = this.formGroup.value;
            insurance.constructionId = construction._id || null
            insurance.onModel = construction.onModel || null
            insurance.partnershipId = partnership._id || null
            insurance.businessId = business._id
            insurance.financierId = financier._id
            insurance.brokerId = broker._id
            this.insurancesFolaService.update(insurance, this.payments, this.insuranceFolaId).subscribe(res => {
                this.navigationService.loadBarFinish();
                this.isLoading = false;
                this.navigationService.showMessage('Se han guardado los cambios');
            }, (error: HttpErrorResponse) => {
                console.log(error);
                this.isLoading = false;
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage(error.error.message);
            });
        }
    }
}
