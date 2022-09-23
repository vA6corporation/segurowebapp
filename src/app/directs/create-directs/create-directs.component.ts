import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DirectsService } from '../directs.service';
import { DialogChequesComponent } from 'src/app/cheques/dialog-cheques/dialog-cheques.component';
import { DialogDepositsComponent } from 'src/app/deposits/dialog-deposits/dialog-deposits.component';
import { WorkersService } from 'src/app/workers/workers.service';
import { WorkerModel } from 'src/app/workers/worker.model';
import { Subscription } from 'rxjs';
import { DialogConstructionsComponent } from 'src/app/constructions/dialog-constructions/dialog-constructions.component';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
import { ConstructionsService } from 'src/app/constructions/constructions.service';
import { BeneficiaryModel } from 'src/app/beneficiaries/beneficiary.model';
import { BusinessModel } from 'src/app/businesses/business.model';
import { ChequeModel } from 'src/app/cheques/cheque.model';
import { DepositModel } from 'src/app/deposits/deposit.model';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';

@Component({
  selector: 'app-create-directs',
  templateUrl: './create-directs.component.html',
  styleUrls: ['./create-directs.component.sass']
})
export class CreateDirectsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly directsService: DirectsService,
    private readonly navigationService: NavigationService,
    private readonly workersService: WorkersService,
    private readonly constructionsService: ConstructionsService,
    private readonly matDialog: MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    financier: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    direct: this.formBuilder.group({
      constructionId: '',
      // timeLimit: [ null, Validators.required ],
      policyNumber: [ null, Validators.required ],
      price: [ null, Validators.required ],
      startDate: [ null, Validators.required ],
      endDate: [ null, Validators.required ],
      guarantee: null,
      prima: null,
      commission: null,
      currency: 'PEN'
    }),
  });

  public construction: ConstructionModel|null = null;
  public business: BusinessModel|null = null;
  public partnership: PartnershipModel|null = null;
  public worker: WorkerModel|null = null;
  public beneficiary: BeneficiaryModel|null = null;
  public isLoading: boolean = false;
  public cheques: ChequeModel[] = [];
  public deposits: DepositModel[] = [];
  public workers: WorkerModel[] = [];

  private workers$: Subscription = new Subscription();
  private queryParams$: Subscription = new Subscription();

  ngOnDestroy() {
    this.workers$.unsubscribe();
    this.queryParams$.unsubscribe();
  }

  ngOnInit(): void { 
    this.navigationService.setTitle('Nuevo adelanto directo');
    this.navigationService.backTo();

    this.workers$ = this.workersService.getWorkers().subscribe(workers => {
      this.workers = workers;
    });

    this.queryParams$ = this.route.queryParams.subscribe(params => {
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
      console.log(construction);
      
      if (construction) {
        this.construction = construction;
        this.business = construction.business;
        this.partnership = construction.partnership;
        this.worker = construction.worker;
        this.beneficiary = construction.beneficiary;
        this.formGroup.patchValue({ direct: { constructionId: construction._id } });
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
      if (financier) {
        this.formGroup.patchValue({ financier });
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
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { financier, direct } = this.formGroup.value;
      direct.partnershipId = this.partnership?._id;
      direct.businessId = this.business?._id;
      direct.beneficiaryId = this.beneficiary?._id;
      direct.financierId = financier._id;
      direct.workerId = this.worker?._id;
      direct.constructionId = this.construction?._id;
      this.directsService.create(direct, this.cheques, this.deposits).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.router.navigate(['/directs']);
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