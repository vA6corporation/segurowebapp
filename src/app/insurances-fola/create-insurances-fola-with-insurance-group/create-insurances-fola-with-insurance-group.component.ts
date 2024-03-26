import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { InsurancesFolaService } from '../insurances-fola.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { WorkersService } from 'src/app/workers/workers.service';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { WorkerModel } from 'src/app/workers/worker.model';
import { InsuranceModel } from 'src/app/insurances/insurance.model';
import { DialogSelectPdfComponent, DialogSelectPdfData } from 'src/app/insurances/dialog-select-pdf/dialog-select-pdf.component';
import { Subscription } from 'rxjs';
import { SheetConstructionsComponent } from 'src/app/insurances/sheet-constructions/sheet-constructions.component';
import { DialogConstructionsComponent } from 'src/app/constructions/dialog-constructions/dialog-constructions.component';
import { DialogInsuranceConstructionsComponent } from 'src/app/insurance-constructions/dialog-insurance-constructions/dialog-insurance-constructions.component';
import { DialogInsuranceBusinessesComponent } from 'src/app/insurance-businesses/dialog-insurance-businesses/dialog-insurance-businesses.component';
import { DialogBrokersComponent } from 'src/app/brokers/dialog-brokers/dialog-brokers.component';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogInsurancePartnershipsComponent } from 'src/app/insurance-partnerships/dialog-insurance-partnerships/dialog-insurance-partnerships.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-insurances-fola-with-insurance-group',
  templateUrl: './create-insurances-fola-with-insurance-group.component.html',
  styleUrl: './create-insurances-fola-with-insurance-group.component.sass'
})
export class CreateInsurancesFolaWithInsuranceGroupComponent {
    constructor(
        private readonly formBuilder: UntypedFormBuilder,
        private readonly insurancesFolaService: InsurancesFolaService,
        private readonly navigationService: NavigationService,
        private readonly workersService: WorkersService,
        private readonly matDialog: MatDialog,
        private readonly location: Location,
        private readonly matBottomSheet: MatBottomSheet,
    ) { }

    formGroup: UntypedFormGroup = this.formBuilder.group({
        construction: this.formBuilder.group({
            object: null,
            onModel: null,
            _id: null,
        }),
        partnership: this.formBuilder.group({
            name: null,
            _id: null,
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
        worker: this.formBuilder.group({
            _id: [null, Validators.required]
        }),
        observations: '',
        policyNumber: [null, Validators.required],
        expirationAt: [null, Validators.required],
        emitionAt: [null, Validators.required],
        prima: [null, Validators.required],
        commission: [null, Validators.required],
        currencyCode: 'PEN',
        isPaid: false,
        isEmition: false,
    });

    construction: ConstructionModel | null = null;
    isLoading: boolean = false;
    workers: WorkerModel[] = [];
    insurances: InsuranceModel[] = [];
    private pdfPolicy: DialogSelectPdfData[] = [];
    private pdfInvoice: DialogSelectPdfData[] = [];
    private pdfVoucher: DialogSelectPdfData[] = [];
    private pdfDocument: DialogSelectPdfData[] = [];

    private handleWorkers$: Subscription = new Subscription();

    ngOnDestroy() {
        this.handleWorkers$.unsubscribe();
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Nuevo Fola');

        this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
            this.workers = workers;
        });
    }

    onAttachPdfPolicy() {
        const dialogRef = this.matDialog.open(DialogSelectPdfComponent, {
            width: '100vw',
            height: '90vh',
            position: { top: '20px' },
            data: this.pdfPolicy
        });

        dialogRef.componentInstance.handleSelectedFile().subscribe(files => {
            this.pdfPolicy = files;
        });
    }

    onAttachPdfInvoice() {
        const dialogRef = this.matDialog.open(DialogSelectPdfComponent, {
            width: '100vw',
            height: '90vh',
            position: { top: '20px' },
            data: this.pdfInvoice
        });

        dialogRef.componentInstance.handleSelectedFile().subscribe(files => {
            this.pdfInvoice = files;
        });
    }

    onAttachPdfVoucher() {
        const dialogRef = this.matDialog.open(DialogSelectPdfComponent, {
            width: '100vw',
            height: '90vh',
            position: { top: '20px' },
            data: this.pdfVoucher
        });

        dialogRef.componentInstance.handleSelectedFile().subscribe(files => {
            this.pdfVoucher = files;
        });
    }

    onAttachPdfDocuments() {
        const dialogRef = this.matDialog.open(DialogSelectPdfComponent, {
            width: '100vw',
            height: '90vh',
            position: { top: '20px' },
            data: this.pdfDocument
        });

        dialogRef.componentInstance.handleSelectedFile().subscribe(files => {
            this.pdfDocument = files;
        });
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
            this.formGroup.patchValue({ business: business || {} });
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

    uploadFile(file: File, insuranceId: string, type: string) {
        // const formData = new FormData();
        // if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel" || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        //     formData.append('file', file),
        //         this.insurancesService.uploadFile(formData, insuranceId, type).subscribe(pdfId => {
        //         })
        // } else {
        //     new Promise((resolve, reject) => {
        //         const reader = new FileReader();
        //         reader.readAsDataURL(file);
        //         reader.onload = function () {
        //             resolve(reader.result);
        //         };
        //         reader.onerror = function (error) {
        //             console.log('Error: ', error);
        //         };
        //     }).then((result: any) => {
        //         const pdf = new jsPDF("p", "mm", "a4");

        //         var width = pdf.internal.pageSize.getWidth();
        //         var height = pdf.internal.pageSize.getHeight();

        //         pdf.addImage(result, 'JPEG', 0, 0, width, height);
        //         const data = pdf.output('blob');
        //         formData.append('file', data);
        //         this.insurancesService.uploadFile(formData, insuranceId, type).subscribe(pdfId => {
        //         })
        //     });
        // }
    }

    onSubmit(): void {
        if (this.formGroup.valid) {
            this.isLoading = true;
            this.navigationService.loadBarStart();
            const { business, financier, broker, worker, partnership, construction, ...insurance } = this.formGroup.value;
            insurance.constructionId = construction._id || null;
            insurance.onModel = construction.onModel || null;
            insurance.partnershipId = partnership._id || null;
            insurance.businessId = business._id;
            insurance.financierId = financier._id;
            insurance.brokerId = broker._id;
            insurance.workerId = worker._id;
            this.insurancesFolaService.createWithInsuranceGroup(insurance).subscribe(insurance => {

                for (const pdf of this.pdfPolicy) {
                    this.uploadFile(pdf.file, insurance._id, 'POLICY');
                }

                for (const pdf of this.pdfInvoice) {
                    this.uploadFile(pdf.file, insurance._id, 'INVOICE');
                }

                for (const pdf of this.pdfDocument) {
                    this.uploadFile(pdf.file, insurance._id, 'DOCUMENT');
                }

                for (const pdf of this.pdfVoucher) {
                    this.uploadFile(pdf.file, insurance._id, 'VOUCHER');
                }

                this.navigationService.loadBarFinish();
                this.isLoading = false;
                this.location.back();
                this.navigationService.showMessage('Registrado correctamente');
            }, (error: HttpErrorResponse) => {
                console.log(error);
                this.isLoading = false;
                this.navigationService.loadBarFinish();
                this.navigationService.showMessage(error.error.message);
            });
        }
    }
}
