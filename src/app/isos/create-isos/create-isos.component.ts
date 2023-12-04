import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BanksService } from 'src/app/banks/banks.service';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogBrokersComponent } from 'src/app/brokers/dialog-brokers/dialog-brokers.component';
import { CompaniesService } from 'src/app/companies/companies.service';
import { CompanyModel } from 'src/app/companies/company.model';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { BankModel } from 'src/app/providers/bank.model';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { IsosService } from '../isos.service';
import { DialogCustomersComponent } from 'src/app/customers/dialog-customers/dialog-customers.component';
import { CertifierModel } from 'src/app/certifiers/certifier.model';
import { CertifiersService } from 'src/app/certifiers/certifiers.service';
import { IsoType } from '../iso-type.enum';
import { DialogCreateCustomersComponent } from 'src/app/customers/dialog-create-customers/dialog-create-customers.component';

@Component({
  selector: 'app-create-isos',
  templateUrl: './create-isos.component.html',
  styleUrls: ['./create-isos.component.sass']
})
export class CreateIsosComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly isosService: IsosService,
    private readonly navigationService: NavigationService,
    private readonly workersService: WorkersService,
    private readonly companiesService: CompaniesService,
    private readonly certifiersService: CertifiersService,
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly banksService: BanksService,
  ) { }

  formArray: FormArray = this.formBuilder.array([])
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    isos: this.formArray,
    customer: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    // type: [ '', Validators.required ],
    certifierId: [ null, Validators.required ],
    workerId: [ null, Validators.required ],
    charge: [ null, Validators.required ],
    commission: null,
    emitionAt: [ null, Validators.required ],
  });

  public construction: ConstructionModel|null = null;
  public isLoading: boolean = false;
  public workers: WorkerModel[] = [];
  public banks: BankModel[] = [];
  public companies: CompanyModel[] = [];
  public certifiers: CertifierModel[] = [];

  private handleCompanies$: Subscription = new Subscription();
  private handleBanks$: Subscription = new Subscription();
  private handleWorkers$: Subscription = new Subscription();
  private handleAuth$: Subscription = new Subscription();
  private handleCertifiers$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleWorkers$.unsubscribe();
    this.handleBanks$.unsubscribe();
    this.handleCompanies$.unsubscribe();
    this.handleAuth$.unsubscribe();
    this.handleCertifiers$.unsubscribe();
  }

  ngOnInit(): void {
    const formGroup = this.formBuilder.group({
      type: [ '', Validators.required ],
    });
    this.formArray.push(formGroup);
    this.navigationService.backTo();

    this.navigationService.setTitle('Nuevo ISO');

    this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
      this.workers = workers;
    });

    this.handleBanks$ = this.banksService.handleBanks().subscribe(banks => {
      this.banks = banks;
    });

    this.handleCompanies$ = this.companiesService.handleCompanies().subscribe(companies => {
      this.companies = companies;
    });

    this.handleCertifiers$ = this.certifiersService.handleCertifiers().subscribe(certifiers => {
      this.certifiers = certifiers;
    });
  }

  onAddIso() {
    const formGroup = this.formBuilder.group({
      type: [ '', Validators.required ],
    });
    this.formArray.push(formGroup);
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
      const iso = this.formGroup.value;
      iso.customerId = iso.customer._id;
      iso.types = iso.isos.map((e: any) => e.type);
      this.isosService.create(iso).subscribe(iso => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Registrado correctamente');
        this.router.navigate(['/isos']);
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
