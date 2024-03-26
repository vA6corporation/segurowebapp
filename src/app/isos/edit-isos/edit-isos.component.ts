import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogBrokersComponent } from 'src/app/brokers/dialog-brokers/dialog-brokers.component';
import { CertifierModel } from 'src/app/certifiers/certifier.model';
import { CertifiersService } from 'src/app/certifiers/certifiers.service';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { DialogCustomersComponent } from 'src/app/customers/dialog-customers/dialog-customers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogCreatePaymentsComponent } from 'src/app/payments/dialog-create-payments/dialog-create-payments.component';
import { PaymentModel } from 'src/app/payments/payment.model';
import { UserModel } from 'src/app/users/user.model';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { IsosService } from '../isos.service';
import { DialogAttachPdfComponent, DialogAttachPdfData } from '../dialog-attach-pdf/dialog-attach-pdf.component';
import { DialogCreateCustomersComponent } from 'src/app/customers/dialog-create-customers/dialog-create-customers.component';

@Component({
    selector: 'app-edit-isos',
    templateUrl: './edit-isos.component.html',
    styleUrls: ['./edit-isos.component.sass']
})
export class EditIsosComponent implements OnInit {

    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly isosService: IsosService,
        private readonly navigationService: NavigationService,
        private readonly workersService: WorkersService,
        private readonly certifiersService: CertifiersService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly authService: AuthService,
        private readonly matDialog: MatDialog,
    ) { }

    formArray: FormArray = this.formBuilder.array([])
    formGroup: UntypedFormGroup = this.formBuilder.group({
        isos: this.formArray,
        customer: this.formBuilder.group({
            name: [null, Validators.required],
            _id: [null, Validators.required],
        }),
        certifierId: [null, Validators.required],
        workerId: [null, Validators.required],
        charge: [null, Validators.required],
        commission: null,
        emitionAt: [null, Validators.required],
    });

    construction: ConstructionModel | null = null;
    isLoading: boolean = false;
    workers: WorkerModel[] = [];
    certifiers: CertifierModel[] = [];
    payments: PaymentModel[] = [];
    user: UserModel | null = null;
    private isoId: string = '';

    private handleAuth$: Subscription = new Subscription();
    private handleCompanies$: Subscription = new Subscription();
    private handleBanks$: Subscription = new Subscription();
    private handleWorkers$: Subscription = new Subscription();
    private handleCertifiers$: Subscription = new Subscription();

    ngOnDestroy() {
        this.handleAuth$.unsubscribe();
        this.handleCompanies$.unsubscribe();
        this.handleBanks$.unsubscribe();
        this.handleWorkers$.unsubscribe();
        this.handleCertifiers$.unsubscribe();
    }

    ngOnInit(): void {
        this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
            this.workers = workers;
        });

        this.handleCertifiers$ = this.certifiersService.handleCertifiers().subscribe(certifiers => {
            this.certifiers = certifiers;
        });

        this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
            this.user = auth.user;
        });

        this.activatedRoute.params.subscribe(params => {
            this.isoId = params.isoId;
            this.navigationService.setTitle('Editar ISO');
            this.isosService.getIsoById(this.isoId).subscribe(iso => {
                const { customer } = iso;
                for (const type of iso.types) {
                    const formGroup = this.formBuilder.group({
                        type: [type, Validators.required],
                    });
                    this.formArray.push(formGroup)
                }
                this.formGroup.patchValue({ customer });
                this.formGroup.patchValue(iso);
                this.payments = iso.payments;
            });
        });
    }

    onAddIso() {
        const formGroup = this.formBuilder.group({
            type: ['', Validators.required],
        });
        this.formArray.push(formGroup);
    }


    onAttachPdf(type: string) {
        const data: DialogAttachPdfData = {
            isoId: this.isoId,
            type,
        }
        this.matDialog.open(DialogAttachPdfComponent, {
            width: '100vw',
            height: '90vh',
            position: { top: '20px' },
            data: data
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

    openDialogBeneficiaries() {
        const dialogRef = this.matDialog.open(DialogBeneficiariesComponent, {
            width: '600px',
            position: { top: '20px' }
        });

        dialogRef.afterClosed().subscribe(beneficiary => {
            this.formGroup.patchValue({ beneficiary: beneficiary || {} });
        });
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadBarStart();
            const iso = this.formGroup.value;
            iso.customerId = iso.customer._id;
            iso.types = iso.isos.map((e: any) => e.type);
            this.navigationService.loadBarStart();
            this.isosService.update(iso, this.payments, this.isoId).subscribe(() => {
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
