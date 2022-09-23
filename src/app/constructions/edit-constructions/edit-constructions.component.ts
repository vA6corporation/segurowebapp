import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { OfficeModel } from 'src/app/auth/office.model';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { OfficesService } from 'src/app/offices/offices.service';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { UserModel } from 'src/app/users/user.model';
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { ConstructionsService } from '../constructions.service';
import { DialogAttachPdfComponent } from '../dialog-attach-pdf/dialog-attach-pdf.component';

@Component({
  selector: 'app-edit-constructions',
  templateUrl: './edit-constructions.component.html',
  styleUrls: ['./edit-constructions.component.sass']
})
export class EditConstructionsComponent implements OnInit {

  constructor(
    private readonly constructionsService: ConstructionsService,
    private readonly  authService: AuthService,
    private readonly navigationService: NavigationService,
    private readonly officesService: OfficesService,
    private readonly route: ActivatedRoute,
    private readonly workersService: WorkersService,
    private readonly matDialog: MatDialog,
    private readonly formBuilder: FormBuilder,
  ) { }
    
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
    // timeLimit: [ null, Validators.required ],
    // place: [ null, Validators.required ],
    object: [ null, Validators.required ],
    code: [ null, Validators.required ],
    emitionAt: [ new Date(), Validators.required ],
    workerId: [ null, Validators.required ],
    processStatusCode: '01',
    constructionCode: '01',
    officeId: '',
    commission: null,
  });
  public offices: OfficeModel[] = [];
  public workers: WorkerModel[] = [];
  public user: UserModel|null = null;
  private constructionId: string = '';

  private workers$: Subscription = new Subscription();
  private handleAuth$: Subscription = new Subscription(); 

  ngOnDestroy() {
    this.workers$.unsubscribe();
    this.handleAuth$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Editar obra');
    this.navigationService.backTo();

    this.workersService.getActiveWorkersGlobal().subscribe(workers => {
      this.workers = workers;
    });

    this.officesService.getActiveOffices().subscribe(offices => {
      this.offices = offices;
    });

    this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
      this.user = auth.user;
    });

    this.route.params.subscribe(params => {
      this.constructionId = params.constructionId;
      this.constructionsService.getConstructionById(params.constructionId).subscribe(construction => {
        console.log(construction);
        const { partnership, business, beneficiary, ...value } = construction;
        this.formGroup.patchValue(value);
        this.formGroup.patchValue({ partnership: partnership || {} });
        this.formGroup.patchValue({ business });
        this.formGroup.patchValue({ beneficiary })
      });
    });
  }

  onChangeOffice() {
    if (this.formGroup.valid) {
      this.navigationService.loadBarStart();
      const { business, beneficiary, partnership, ...construction } = this.formGroup.value;
      construction.businessId = business._id;
      construction.beneficiaryId = beneficiary._id;
      construction.partnershipId = partnership._id;
      this.constructionsService.updateOffice(this.constructionId, construction).subscribe(() => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
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

  onAttachPdf() {
    this.matDialog.open(DialogAttachPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data: this.constructionId,
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
      this.constructionsService.update(construction, this.constructionId).subscribe(res => {
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
