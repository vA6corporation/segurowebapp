import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DialogBrokersComponent } from 'src/app/brokers/dialog-brokers/dialog-brokers.component';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { DialogCustomersComponent } from 'src/app/customers/dialog-customers/dialog-customers.component';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogCreatePaymentsComponent } from 'src/app/payments/dialog-create-payments/dialog-create-payments.component';
import { PaymentModel } from 'src/app/payments/payment.model';
import { BankModel } from 'src/app/providers/bank.model';
import { UserModel } from 'src/app/users/user.model';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { DialogAttachPdfComponent, DialogAttachPdfData } from '../dialog-attach-pdf/dialog-attach-pdf.component';
import { FideicomisosService } from '../fideicomisos.service';
import { DialogCreateCustomersComponent } from 'src/app/customers/dialog-create-customers/dialog-create-customers.component';

@Component({
    selector: 'app-edit-fideicomisos',
    templateUrl: './edit-fideicomisos.component.html',
    styleUrls: ['./edit-fideicomisos.component.sass']
})
export class EditFideicomisosComponent implements OnInit {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly fideicomisosService: FideicomisosService,
        private readonly navigationService: NavigationService,
        private readonly workersService: WorkersService,
        private readonly matDialog: MatDialog,
        private readonly authService: AuthService,
        private readonly activatedRoute: ActivatedRoute,
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
        constructionName: ['', Validators.required],
        days: [null, Validators.required],
        emitionAt: [null, Validators.required],
        charge: [null, Validators.required],
        commission: null,
    });

    construction: ConstructionModel | null = null;
    isLoading: boolean = false;
    workers: WorkerModel[] = [];
    companies: any[] = [];
    banks: BankModel[] = [];
    payments: PaymentModel[] = [];
    user: UserModel | null = null;
    private fideicomisoId: string = '';
    
    private handleAuth$: Subscription = new Subscription();
    private handleCompanies$: Subscription = new Subscription();
    private handleBanks$: Subscription = new Subscription();
    private handleWorkers$: Subscription = new Subscription();

    ngOnDestroy() {
        this.handleAuth$.unsubscribe();
        this.handleCompanies$.unsubscribe();
        this.handleBanks$.unsubscribe();
        this.handleWorkers$.unsubscribe();
    }

    ngOnInit(): void {
        this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
            this.workers = workers;
        });

        this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
            this.user = auth.user;
        });

        this.activatedRoute.params.subscribe(params => {
            this.fideicomisoId = params.fideicomisoId;
            this.navigationService.setTitle('Editar fideicomiso');
            this.fideicomisosService.getFideicomisoById(this.fideicomisoId).subscribe(fideicomiso => {
                this.formGroup.patchValue(fideicomiso);
                this.payments = fideicomiso.payments;
            });
        });
    }

    onAttachPdf(type: string) {
        const data: DialogAttachPdfData = {
            fideicomisoId: this.fideicomisoId,
            type,
        }
        this.matDialog.open(DialogAttachPdfComponent, {
            width: '80vw',
            height: '90vh',
            position: { top: '20px' },
            data,
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

    openDialogCustomers() {
        const dialogRef = this.matDialog.open(DialogCustomersComponent, {
            width: '600px',
            position: { top: '20px' }
        })

        dialogRef.afterClosed().subscribe(customer => {
            this.formGroup.patchValue({ customer });
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

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadBarStart();
            const { customer, financier, worker, ...fideicomiso } = this.formGroup.value;
            fideicomiso.customerId = customer._id;
            fideicomiso.financierId = financier._id;
            fideicomiso.workerId = worker._id;
            this.navigationService.loadBarStart();
            this.fideicomisosService.update(fideicomiso, this.payments, this.fideicomisoId).subscribe(() => {
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
