import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { CompaniesService } from 'src/app/companies/companies.service';
import { CompanyModel } from 'src/app/companies/company.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { UserModel } from 'src/app/users/user.model';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { ConstructionsService } from '../constructions.service';
import { DialogPaymentsComponent } from '../dialog-payments/dialog-payments.component';
import { DialogPercentCompletionsComponent } from '../dialog-percent-completions/dialog-percent-completions.component';
import { PaymentModel } from '../payment.model';
import { PercentCompletionModel } from '../percent-completion.model';

@Component({
  selector: 'app-create-constructions',
  templateUrl: './create-constructions.component.html',
  styleUrls: ['./create-constructions.component.sass']
})
export class CreateConstructionsComponent implements OnInit {

  constructor(
    private readonly constructionsService: ConstructionsService,
    private readonly navigationService: NavigationService,
    private readonly companiesService: CompaniesService,
    private readonly workersService: WorkersService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly matDialog: MatDialog,
  ) { }
    
  private formBuilder: FormBuilder = new FormBuilder();
  public isLoading: boolean = false;
  public formGroup: FormGroup = this.formBuilder.group({
    partnership: this.formBuilder.group({
      _id: null,
      name: null,
    }),
    business: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    beneficiary: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    companyId: null,
    object: [ null, Validators.required ],
    awardedAmount: [ null, Validators.required ],
    code: [ null, Validators.required ],
    emitionAt: [ new Date(), Validators.required ],
    workerId: [ null, Validators.required ],
    processStatusCode: '01',
    constructionCode: '01',
    commission: null
  });
  public user: UserModel|null = null;

  public workers: WorkerModel[] = [];
  public companies: CompanyModel[] = [];
  public percentCompletions: PercentCompletionModel[] = [];
  public payments: PaymentModel[] = [];
  public months: any[] = [
    'ENERO',
    'FEBRERO',
    'MARZO',
    'ABRIL',
    'MAYO',
    'JUNIO',
    'JULIO',
    'AGOSTO',
    'SEPTIEMBRE',
    'OCTUBRE',
    'NOVIEMBRE',
    'DICIEMBRE',
  ];

  private handleWorkers$: Subscription = new Subscription();
  private handleAuth$: Subscription = new Subscription(); 
  private handleCompanies$: Subscription = new Subscription();

  ngOnDestroy() {
    this.handleWorkers$.unsubscribe();
    this.handleAuth$.unsubscribe();
    this.handleCompanies$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Nueva obra');
    this.navigationService.backTo();

    this.handleCompanies$ = this.companiesService.handleCompanies().subscribe(companies => {
      this.companies = companies;
    });

    this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
      this.workers = workers;
    });

    this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
      this.user = auth.user;
    });

  }

  onDialogPercentCompletions() {
    const dialogRef = this.matDialog.open(DialogPercentCompletionsComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(percentCompletion => {
      if (percentCompletion) {
        this.percentCompletions.push(percentCompletion);
      }
    });
  }

  onDialogPayments() {
    const dialogRef = this.matDialog.open(DialogPaymentsComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(payment => {
      if (payment) {
        this.payments.push(payment);
      }
    });
  }

  onRemovePercentCompletion(index: number) {
    this.percentCompletions.splice(index, 1);
  }

  onRemovePayment(index: number) {
    this.payments.splice(index, 1);
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

  openDialogBeneficiaries() {
    const dialogRef = this.matDialog.open(DialogBeneficiariesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(beneficiary => {
      if (beneficiary) {
        this.formGroup.patchValue({ beneficiary });
      }
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

  async onSubmit() {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { business, partnership, beneficiary, ...construction } = this.formGroup.value;
      construction.businessId = business._id;
      construction.partnershipId = partnership._id;
      construction.beneficiaryId = beneficiary._id;
      this.constructionsService.create(construction, this.payments, this.percentCompletions).subscribe(res => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.router.navigate(['/constructions']);
        this.navigationService.showMessage('Registrado correctamente');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
