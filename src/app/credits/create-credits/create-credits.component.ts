import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { Subscription } from 'rxjs';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogBrokersComponent } from 'src/app/brokers/dialog-brokers/dialog-brokers.component';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { CompaniesService } from 'src/app/companies/companies.service';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { CreditsService } from '../credits.service';
import { DialogSelectPdfComponent } from '../dialog-select-pdf/dialog-select-pdf.component';

@Component({
  selector: 'app-create-credits',
  templateUrl: './create-credits.component.html',
  styleUrls: ['./create-credits.component.sass']
})
export class CreateCreditsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly creditsService: CreditsService,
    private readonly navigationService: NavigationService,
    private readonly workersService: WorkersService,
    private readonly companiesService: CompaniesService,
    private readonly router: Router,
    private readonly matDialog: MatDialog,
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    financier: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    business: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    partnership: this.formBuilder.group({
      _id: null,
      name: null,
    }),
    worker: this.formBuilder.group({
      _id: [ null, Validators.required ]
    }),
    credit: this.formBuilder.group({
      companyId: [ '', Validators.required ],
      days: [ null, Validators. required ],
      emitionAt: [ null, Validators.required ],
      prima: null,
      commission: null,
      charge: [ null, Validators.required ],
    }),
  });

  public construction: ConstructionModel|null = null;
  public isLoading: boolean = false;
  public workers: WorkerModel[] = [];
  private pdfDocument: File|null = null;
  private pdfCarta: File|null = null;
  private pdfVoucher: File|null = null;
  public companies: any[] = [];

  private handleWorkers$: Subscription = new Subscription();
  private handleCompanies$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleWorkers$.unsubscribe();
    this.handleCompanies$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.backTo();
    this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
      this.workers = workers;
    });

    this.handleCompanies$ = this.companiesService.handleCompanies().subscribe(companies => {
      this.companies = companies;
    });
  }

  onAttachPdfCarta() {
    const dialogRef = this.matDialog.open(DialogSelectPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      // data,
    });

    dialogRef.componentInstance.handleSelectedFile().subscribe(file => {
      this.pdfCarta = file;
    })
  }

  onAttachPdfVoucher() {
    // const data: CreditPdfData = {
    //   type: 'VOUCHER',
    //   // creditId: this.creditId,
    // }

    const dialogRef = this.matDialog.open(DialogSelectPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      // data,
    });

    dialogRef.componentInstance.handleSelectedFile().subscribe(file => {
      this.pdfVoucher = file;
    })
  }

  onAttachPdfDocuments() {
    // const data: CreditPdfData = {
    //   type: 'DOCUMENT',
    //   // creditId: this.creditId,
    // }

    const dialogRef = this.matDialog.open(DialogSelectPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      // data,
    });

    dialogRef.componentInstance.handleSelectedFile().subscribe(file => {
      this.pdfDocument = file;
    })
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

  uploadFile(file: File, type: string, creditId: string) {
    const formData = new FormData();
    if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "application/vnd.ms-excel" || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      formData.append('file', file),
      this.creditsService.uploadPdf(formData, creditId, type).subscribe(pdfId => {
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
        this.creditsService.uploadPdf(formData, creditId, type).subscribe(pdfId => {
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
      const { business, financier, partnership, worker, credit } = this.formGroup.value;
      credit.businessId = business._id;
      credit.financierId = financier._id;
      credit.partnershipId = partnership._id;
      credit.workerId = worker._id;
      this.navigationService.loadBarStart();
      this.creditsService.create(credit).subscribe(credit => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();

        if (this.pdfCarta) {
          this.uploadFile(this.pdfCarta, 'CARTA', credit._id);
        }

        if (this.pdfDocument) {
          this.uploadFile(this.pdfDocument, 'DOCUMENT', credit._id);
        }

        if (this.pdfVoucher) {
          this.uploadFile(this.pdfVoucher, 'VOUCHER', credit._id);
        }

        this.navigationService.showMessage('Registrado correctamente');
        this.router.navigate(['/credits']);
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
      // this.insurancesService.create(insurance).subscribe(res => {
      //   this.navigationService.loadBarFinish();
      //   console.log(res);
      //   this.isLoading = false;
      //   this.location.back();
      //   this.navigationService.showMessage('Registrado correctamente');
      // }, (error: HttpErrorResponse) => {
      //   console.log(error);
      //   this.isLoading = false;
      //   this.navigationService.loadBarFinish();
      //   this.navigationService.showMessage(error.error.message);
      // });
    }
  }

}
