import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BanksService } from 'src/app/banks/banks.service';
import { CompaniesService } from 'src/app/companies/companies.service';
import { CompanyModel } from 'src/app/companies/company.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { BankModel } from 'src/app/providers/bank.model';
import { FinancierModelsService } from '../financiers.service';

@Component({
  selector: 'app-edit-financiers',
  templateUrl: './edit-financiers.component.html',
  styleUrls: ['./edit-financiers.component.sass']
})
export class EditFinancierModelsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly financiersService: FinancierModelsService,
    private readonly navigationService: NavigationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly banksService: BanksService,
    private readonly companiesService: CompaniesService,
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    document: [ null, Validators.required ],
    name: [ null, Validators.required ],
    email: [ null, [ Validators.required, Validators.email ] ],
    mobileNumber: null,
    phoneNumber: null,
    annexed: null,
    minimumPrima: null,
    daysAtYear: [ null, Validators.required ],
    emitionYearlyRatePercentage: [ null, Validators.required ],
    emitionPrimaPercentage: [ null, Validators.required ],
    emitionLawPercentage: [ null, Validators.required ],
    emitionCharge: [ null, Validators.required ],
    renewalYearlyRatePercentage: [ null, Validators.required ],
    renewalPrimaPercentage: [ null, Validators.required ],
    renewalLawPercentage: [ null, Validators.required ],
    renewalCharge: [ null, Validators.required ],
    companyId: [ null, Validators.required ],
    bankPenId: [ null, Validators.required ],
    bankUsdId: [ null, Validators.required ],
    insuranceCommissions: this.formBuilder.group({
      SCTR: null,
      SOAT: null,
      VIDALEY: null,
      POLIZACAR: null,
      POLIZATREC: null,
      POLIZAEAR: null,
      RCIVIL: null,
      VEHICULAR: null,
      VIDA: null,
      EPS: null,
      SALUD: null,
      ACCIDENTES: null,
    }),
  });

  public isLoading: boolean = false;
  public banks: BankModel[] = [];
  public companies: CompanyModel[] = [];
  private financierId: string = '';

  private handleCompanies$: Subscription = new Subscription();
  private handleBanks$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleCompanies$.unsubscribe();
    this.handleBanks$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Editar financiera');
    this.navigationService.backTo();

    this.handleBanks$ = this.banksService.handleBanks().subscribe(banks => {
      this.banks = banks;
    });

    this.handleCompanies$ = this.companiesService.handleCompanies().subscribe(companies => {
      this.companies = companies;
    });

    this.activatedRoute.params.subscribe(async params => {
      this.financierId = params.financierId;
      this.financiersService.getFinancierModelById(this.financierId).subscribe(financier => {
        this.formGroup.patchValue(financier);
      });
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      this.financiersService.update(this.formGroup.value, this.financierId).subscribe(res => {
        console.log(res);
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
