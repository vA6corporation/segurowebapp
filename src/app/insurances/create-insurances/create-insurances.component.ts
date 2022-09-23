import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogBrokersComponent } from 'src/app/brokers/dialog-brokers/dialog-brokers.component';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { InsurancesService } from '../insurances.service';
import { Location } from '@angular/common'
import { DialogInsurancePartnershipsComponent } from 'src/app/insurance-partnerships/dialog-insurance-partnerships/dialog-insurance-partnerships.component';
import { DialogInsuranceConstructionsComponent } from 'src/app/insurance-constructions/dialog-insurance-constructions/dialog-insurance-constructions.component';
import { DialogInsuranceBusinessesComponent } from 'src/app/insurance-businesses/dialog-insurance-businesses/dialog-insurance-businesses.component';
import { DialogSelectPdfComponent, DialogSelectPdfData } from '../dialog-select-pdf/dialog-select-pdf.component';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-create-insurances',
  templateUrl: './create-insurances.component.html',
  styleUrls: ['./create-insurances.component.sass']
})
export class CreateInsurancesComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly insurancesService: InsurancesService,
    private readonly navigationService: NavigationService,
    private readonly workersService: WorkersService,
    private readonly route: ActivatedRoute,
    private readonly matDialog: MatDialog,
    private readonly location: Location,
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    construction: this.formBuilder.group({
      object: null,
      _id: null,
    }),
    partnership: this.formBuilder.group({
      name: null,
      _id: null,
    }),
    business: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    broker: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    financier: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    worker: this.formBuilder.group({
      _id: [ null, Validators.required ]
    }),
    insurance: this.formBuilder.group({
      policyNumber: [ null, Validators.required ],
      expirationAt: [null, Validators. required ],
      emitionAt: [ null, Validators.required ],
      prima: null,
      commission: null,
      currency: 'PEN',
      isPaid: false,
      isEmition: false,
    }),
  });

  public construction: ConstructionModel|null = null;
  public isLoading: boolean = false;
  public workers: WorkerModel[] = [];
  private type: string = '';
  private pdfPolicy: DialogSelectPdfData[] = [];
  private pdfInvoice: DialogSelectPdfData[] = [];
  private pdfVoucher: DialogSelectPdfData[] = [];
  private pdfDocument: DialogSelectPdfData[] = [];

  private workers$: Subscription = new Subscription;

  ngOnDestroy() {
    this.workers$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.backTo();
    
    this.workers$ = this.workersService.getWorkers().subscribe(workers => {
      this.workers = workers;
    });
    
    this.route.params.subscribe(params => {
      this.type = params.type;
      this.navigationService.setTitle('Nuevo ' + this.type);
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
    const dialogRef = this.matDialog.open(DialogInsuranceConstructionsComponent, {
      width: '100vw',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(construction => {
      if (construction) {
        this.formGroup.patchValue({ construction });
      }
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
    const formData = new FormData();
    if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel" || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      formData.append('file', file),
      this.insurancesService.uploadPdf(formData, insuranceId, type).subscribe(pdfId => {
        console.log(pdfId);
        // this.fetchData();
      });  
    } else {
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }).then((result: any) => {
        const pdf = new jsPDF("p", "mm", "a4");

        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();

        pdf.addImage(result, 'JPEG', 0, 0, width, height);
        const data = pdf.output('blob');
        formData.append('file', data);
        this.insurancesService.uploadPdf(formData, insuranceId, type).subscribe(pdfId => {
          console.log(pdfId);
          // this.fetchData();
        });
      });
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { business, financier, broker, worker, partnership, insurance, construction } = this.formGroup.value;
      insurance.constructionId = construction?._id || null;
      insurance.partnershipId = partnership?._id || null;
      insurance.businessId = business._id;
      insurance.financierId = financier._id;
      insurance.brokerId = broker._id;
      insurance.workerId = worker._id;
      insurance.type = this.type;
      this.insurancesService.create(insurance).subscribe(insurance => {
        
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