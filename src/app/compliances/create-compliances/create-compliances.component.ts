import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { CompliancesService } from '../compliances.service';
import { DialogChequesComponent } from 'src/app/cheques/dialog-cheques/dialog-cheques.component';
import { DialogDepositsComponent } from 'src/app/deposits/dialog-deposits/dialog-deposits.component';
import { WorkersService } from 'src/app/workers/workers.service';
import { WorkerModel } from 'src/app/workers/worker.model';
import { Subscription } from 'rxjs';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { DialogConstructionsComponent } from 'src/app/constructions/dialog-constructions/dialog-constructions.component';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
import { ConstructionsService } from 'src/app/constructions/constructions.service';
import { BeneficiaryModel } from 'src/app/beneficiaries/beneficiary.model';
import { BusinessModel } from 'src/app/businesses/business.model';
import { DepositModel } from 'src/app/deposits/deposit.model';
import { ChequeModel } from 'src/app/cheques/cheque.model';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { BankModel } from 'src/app/providers/bank.model';
import { CompanyModel } from 'src/app/companies/company.model';
import { CompaniesService } from 'src/app/companies/companies.service';
import { BanksService } from 'src/app/banks/banks.service';

@Component({
  selector: 'app-create-compliances',
  templateUrl: './create-compliances.component.html',
  styleUrls: ['./create-compliances.component.sass']
})
export class CreateCompliancesComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly compliancesService: CompliancesService,
    private readonly workersService: WorkersService,
    private readonly constructionsService: ConstructionsService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly companiesService: CompaniesService,
    private readonly banksService: BanksService,
  ) { }

  public formGroup: UntypedFormGroup = this.formBuilder.group({
    financier: this.formBuilder.group({
      _id: [ null, Validators.required ],
      name: [ null, Validators.required ],
    }),
    compliance: this.formBuilder.group({
      constructionId: '',
      policyNumber: [ null, Validators.required ],
      price: [ null, Validators.required ],
      pagare: null,
      observations: null,
      startDate: [ null, Validators.required ],
      endDate: [ null, Validators.required ],
      guarantee: null,
      prima: null,
      commission: null,
      currencyCode: 'PEN',
      companyId: [ '', Validators.required ],
      bankId: [ '', Validators.required ],
    }),
  });

  public construction: ConstructionModel|null = null;
  public business: BusinessModel|null = null;
  public partnership: PartnershipModel|null = null;
  public worker: WorkerModel|null = null;
  public beneficiary: BeneficiaryModel|null = null;
  public isLoading: boolean = false;
  public deposits: DepositModel[] = [];
  public cheques: ChequeModel[] = [];
  public workers: WorkerModel[] = [];
  public banks: BankModel[] = [];
  public companies: CompanyModel[] = [];

  private handleCompanies$: Subscription = new Subscription();
  private handleBanks$: Subscription = new Subscription();
  private handleWorkers$: Subscription = new Subscription();
  private queryParams$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleCompanies$.unsubscribe();
    this.handleBanks$.unsubscribe();
    this.handleWorkers$.unsubscribe();
    this.queryParams$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.backTo();
    this.navigationService.setTitle('Nuevo fiel cumplimiento');

    this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
      this.workers = workers;
    });

    this.handleBanks$ = this.banksService.handleBanks().subscribe(banks => {
      this.banks = banks;
    });

    this.handleCompanies$ = this.companiesService.handleCompanies().subscribe(companies => {
      this.companies = companies;
    });

    this.queryParams$ = this.activatedRoute.queryParams.subscribe(params => {
      if (params.constructionId) {
        this.constructionsService.getConstructionById(params.constructionId).subscribe(construction => {
          if (construction) {
            this.construction = construction;
            this.business = construction.business;
            this.partnership = construction.partnership;
            this.worker = construction.worker;
            this.beneficiary = construction.beneficiary;
            this.formGroup.patchValue({ material: { constructionId: construction._id } });
          }
        });
      }
    });
  }

  onEditConstruction() {
    const dialogRef = this.matDialog.open(DialogConstructionsComponent, {
      width: '100vw',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(construction => {
      if (construction) {
        this.construction = construction;
        this.business = construction.business;
        this.partnership = construction.partnership;
        this.worker = construction.worker;
        this.beneficiary = construction.beneficiary;
        this.formGroup.patchValue({ compliance: { constructionId: construction._id } });
      }
    });
  }

  removeCheque(index: number): void {
    this.cheques.splice(index, 1);
  }

  removeDeposit(index: number): void {
    this.deposits.splice(index, 1);
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
        this.cheques.push(cheque);
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
      }
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid && this.construction) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { financier, compliance } = this.formGroup.value;
      compliance.partnershipId = this.partnership?._id;
      compliance.businessId = this.business?._id;
      compliance.beneficiaryId = this.beneficiary?._id;
      compliance.financierId = financier._id;
      compliance.workerId = this.worker?._id;
      compliance.constructionId = this.construction?._id;
      this.compliancesService.create(compliance, this.cheques, this.deposits, this.construction.officeId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.router.navigate(['/compliances']);
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
