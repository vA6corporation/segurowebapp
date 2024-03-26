import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BeneficiaryModel } from 'src/app/beneficiaries/beneficiary.model';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { BusinessModel } from 'src/app/businesses/business.model';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { ChequeModel } from 'src/app/cheques/cheque.model';
import { ChequesService } from 'src/app/cheques/cheques.service';
import { DialogChequesComponent } from 'src/app/cheques/dialog-cheques/dialog-cheques.component';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { DialogConstructionsComponent } from 'src/app/constructions/dialog-constructions/dialog-constructions.component';
import { DialogDetailConstructionsComponent } from 'src/app/constructions/dialog-detail-constructions/dialog-detail-constructions.component';
import { DepositModel } from 'src/app/deposits/deposit.model';
import { DepositsService } from 'src/app/deposits/deposits.service';
import { DialogDepositsComponent } from 'src/app/deposits/dialog-deposits/dialog-deposits.component';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
import { DialogCreatePaymentsComponent } from 'src/app/payments/dialog-create-payments/dialog-create-payments.component';
import { PaymentModel } from 'src/app/payments/payment.model';
import { UserModel } from 'src/app/users/user.model';
import { WorkerModel } from 'src/app/workers/worker.model';
import { DialogPdfDirectsComponent, DirectPdfData } from '../dialog-pdf-directs/dialog-pdf-directs.component';
import { DirectModel } from '../direct.model';
import { DirectsService } from '../directs.service';
import { DialogBrokersComponent } from 'src/app/brokers/dialog-brokers/dialog-brokers.component';

@Component({
    selector: 'app-edit-directs',
    templateUrl: './edit-directs.component.html',
    styleUrls: ['./edit-directs.component.sass']
})
export class EditDirectsComponent implements OnInit {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly directsService: DirectsService,
        private readonly chequesService: ChequesService,
        private readonly depositsService: DepositsService,
        private readonly navigationService: NavigationService,
        private readonly matDialog: MatDialog,
        private readonly authService: AuthService,
        private readonly activatedRoute: ActivatedRoute,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        financier: this.formBuilder.group({
            _id: [null, Validators.required],
            name: [null, Validators.required],
        }),
        broker: this.formBuilder.group({
            _id: [null, Validators.required],
            name: [null, Validators.required],
        }),
        direct: this.formBuilder.group({
            constructionId: '',
            policyNumber: [null, Validators.required],
            object: null,
            price: [null, Validators.required],
            pagare: null,
            observations: null,
            startDate: [null, Validators.required],
            endDate: [null, Validators.required],
            voucherAt: null,
            guarantee: null,
            prima: null,
            isEmition: false,
            isPaid: false,
            commission: null,
            currencyCode: 'PEN'
        }),
    });

    isLoading: boolean = false;
    user: UserModel | null = null;
    construction: ConstructionModel | null = null;
    business: BusinessModel | null = null;
    partnership: PartnershipModel | null = null;
    beneficiary: BeneficiaryModel | null = null;
    worker: WorkerModel | null = null;
    direct: DirectModel | null = null;
    payments: PaymentModel[] = [];
    cheques: ChequeModel[] = [];
    deposits: DepositModel[] = [];
    private directId: string = '';

    private handleCompanies$: Subscription = new Subscription();
    private handleBanks$: Subscription = new Subscription();
    private handleAuth$: Subscription = new Subscription();

    ngOnDestroy() {
        this.handleCompanies$.unsubscribe();
        this.handleBanks$.unsubscribe();
        this.handleAuth$.unsubscribe();
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Editar adelanto directo');
        this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
            this.user = auth.user;
        });

        this.activatedRoute.params.subscribe(params => {
            this.directId = params.directId;
            this.directsService.getDirectById(this.directId).subscribe(direct => {
                this.direct = direct;
                const { financier, beneficiary, cheques = [], deposits = [], construction, payments, broker } = direct;
                this.formGroup.patchValue({ financier })
                this.formGroup.patchValue({ direct })
                this.formGroup.patchValue({ broker })
                this.construction = construction;
                this.beneficiary = beneficiary;
                this.business = construction?.business || null;
                this.partnership = construction?.partnership || null;
                this.worker = direct.worker;
                this.cheques = cheques;
                this.deposits = deposits;
                this.payments = payments;
            });
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

    onDialogPayments() {
        const dialogRef = this.matDialog.open(DialogCreatePaymentsComponent, {
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

    onEditConstruction() {
        const dialogRef = this.matDialog.open(DialogConstructionsComponent, {
            width: '100vw',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(construction => {
            console.log(construction);

            if (construction) {
                this.construction = construction;
                this.formGroup.patchValue({ direct: { constructionId: construction._id } });
            }
        });
    }

    onShowDetails(constructionId: string) {
        this.matDialog.open(DialogDetailConstructionsComponent, {
            width: '100vw',
            // height: '90vh',
            position: { top: '20px' },
            data: constructionId,
        });
    }

    removeCheque(index: number): void {
        const ok = confirm('Esta seguro de eliminar?...');
        if (ok) {
            const cheque = this.cheques[index];
            this.chequesService.deleteOne(cheque._id).subscribe(() => {
                this.cheques.splice(index, 1);
                this.navigationService.showMessage('Eliminado correctamente');
            }, (error: HttpErrorResponse) => {
                this.navigationService.showMessage(error.error.message);
            });
        }
    }

    removeDeposit(index: number): void {
        const ok = confirm('Esta seguro de eliminar?...');
        if (ok) {
            const deposit = this.deposits[index];
            this.deposits.splice(index, 1);
            this.depositsService.deleteOne(deposit._id || '').toPromise();
            this.navigationService.showMessage('Se han guardado los cambios');
        }
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

    openDialogCheques() {
        const dialogRef = this.matDialog.open(DialogChequesComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(cheque => {
            if (cheque) {
                cheque.onModel = 'Direct';
                cheque.guaranteeId = this.directId;
                this.chequesService.create(cheque).subscribe(cheque => {
                    this.cheques.push(cheque);
                    this.navigationService.showMessage('Se han guardado los cambios');
                });
            }
        });
    }

    onEditCheque(cheque: ChequeModel): void {
        const dialogRef = this.matDialog.open(DialogChequesComponent, {
            width: '600px',
            position: { top: '20px' },
            data: cheque,
        });

        dialogRef.afterClosed().subscribe(async updatedCheque => {
            if (updatedCheque) {
                Object.assign(cheque, updatedCheque);
                await this.chequesService.update(updatedCheque, cheque._id).toPromise();
                this.navigationService.showMessage('Se han guardado los cambios');
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
                deposit.onModel = 'Direct';
                deposit.guaranteeId = this.directId;
                this.depositsService.create(deposit).toPromise();
                this.navigationService.showMessage('Se han guardado los cambios');
            }
        });
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadBarStart();
            const { financier, direct, broker } = this.formGroup.value;
            direct.financierId = financier._id
            direct.brokerId = broker._id
            this.directsService.updateWithPayments(direct, this.payments, this.directId).subscribe({
                next: () => {
                    this.isLoading = false;
                    this.navigationService.loadBarFinish();
                    this.navigationService.showMessage('Se han guardado los cambios');
                }, error: (error: HttpErrorResponse) => {
                    console.log(error);
                    this.isLoading = false;
                    this.navigationService.loadBarFinish();
                    this.navigationService.showMessage(error.error.message);
                }
            });
        }
    }

    onAttachPdfInvoice() {
        if (this.construction) {
            const data: DirectPdfData = {
                type: 'invoice',
                constructionId: this.construction._id,
                directId: this.directId
            }

            this.matDialog.open(DialogPdfDirectsComponent, {
                width: '100vw',
                height: '90vh',
                position: { top: '20px' },
                data,
            });
        }
    }

    onAttachPdfTicket() {
        if (this.construction) {
            const data: DirectPdfData = {
                type: 'voucher',
                constructionId: this.construction._id,
                directId: this.directId
            }

            this.matDialog.open(DialogPdfDirectsComponent, {
                width: '100vw',
                height: '90vh',
                position: { top: '20px' },
                data,
            });
        }
    }

    onAttachPdfDocuments() {
        if (this.construction) {
            const data: DirectPdfData = {
                type: 'document',
                constructionId: this.construction._id,
                directId: this.directId
            }

            this.matDialog.open(DialogPdfDirectsComponent, {
                width: '100vw',
                height: '90vh',
                position: { top: '20px' },
                data,
            });
        }
    }

    onAttachPdfCheques() {
        if (this.construction) {
            const data: DirectPdfData = {
                type: 'cheque',
                constructionId: this.construction._id,
                directId: this.directId
            }

            this.matDialog.open(DialogPdfDirectsComponent, {
                width: '100vw',
                height: '90vh',
                position: { top: '20px' },
                data,
            });
        }
    }

    onAttachPdfDeposits() {
        if (this.construction) {
            const data: DirectPdfData = {
                type: 'deposit',
                constructionId: this.construction._id,
                directId: this.directId
            }

            this.matDialog.open(DialogPdfDirectsComponent, {
                width: '100vw',
                height: '90vh',
                position: { top: '20px' },
                data,
            });
        }
    }

    onAttachPdfFianzas() {
        if (this.construction) {
            const data: DirectPdfData = {
                type: 'fianza',
                constructionId: this.construction._id,
                directId: this.directId
            }

            this.matDialog.open(DialogPdfDirectsComponent, {
                width: '100vw',
                height: '90vh',
                position: { top: '20px' },
                data,
            });
        }
    }

    onAttachPdfConstructions() {
        if (this.construction) {
            const data: DirectPdfData = {
                type: 'construction',
                constructionId: this.construction._id,
                directId: this.directId
            }

            this.matDialog.open(DialogPdfDirectsComponent, {
                width: '100vw',
                height: '90vh',
                position: { top: '20px' },
                data,
            });
        }
    }

}
