import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BanksService } from 'src/app/banks/banks.service';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogBrokersComponent } from 'src/app/brokers/dialog-brokers/dialog-brokers.component';
import { CertifierModel } from 'src/app/certifiers/certifier.model';
import { CertifiersService } from 'src/app/certifiers/certifiers.service';
import { CompaniesService } from 'src/app/companies/companies.service';
import { CompanyModel } from 'src/app/companies/company.model';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { DialogCustomersComponent } from 'src/app/customers/dialog-customers/dialog-customers.component';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { BankModel } from 'src/app/providers/bank.model';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { CapitalIncreasesService } from '../capital-increases.service';

@Component({
  selector: 'app-create-capital-increases',
  templateUrl: './create-capital-increases.component.html',
  styleUrls: ['./create-capital-increases.component.sass']
})
export class CreateCapitalIncreasesComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly capitalIncreasesService: CapitalIncreasesService,
    private readonly navigationService: NavigationService,
    private readonly workersService: WorkersService,
    private readonly companiesService: CompaniesService,
    private readonly certifiersService: CertifiersService,
    private readonly router: Router,
    private readonly matDialog: MatDialog,
    private readonly banksService: BanksService,
  ) { }

  public formGroup: UntypedFormGroup = this.formBuilder.group({
    customer: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    workerId: [ null, Validators.required ],
    capital: [ null, Validators.required ],
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
    this.navigationService.setTitle('Nuevo incremento de capital');
    this.navigationService.backTo();

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

  openDialogCustomers() {
    const dialogRef = this.matDialog.open(DialogCustomersComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(customer => {
      if (customer) {
        this.formGroup.patchValue({ customer });
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

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const capitalIncrease = this.formGroup.value;
      capitalIncrease.customerId = capitalIncrease.customer._id;
      this.capitalIncreasesService.create(capitalIncrease).subscribe(iso => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Registrado correctamente');
        this.router.navigate(['/capitalIncreases']);
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
