import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CapitalIncreasesService } from '../capital-increases.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { WorkersService } from 'src/app/workers/workers.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { WorkerModel } from 'src/app/workers/worker.model';
import { Subscription } from 'rxjs';
import { DialogCustomersComponent } from 'src/app/customers/dialog-customers/dialog-customers.component';
import { DialogBrokersComponent } from 'src/app/brokers/dialog-brokers/dialog-brokers.component';
import { HttpErrorResponse } from '@angular/common/http';
import { PaymentModel } from 'src/app/payments/payment.model';
import { DialogCreatePaymentsComponent } from 'src/app/payments/dialog-create-payments/dialog-create-payments.component';
import { UserModel } from 'src/app/users/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { DialogAttachPdfComponent, DialogAttachPdfData } from '../dialog-attach-pdf/dialog-attach-pdf.component';
import { DialogCreateCustomersComponent } from 'src/app/customers/dialog-create-customers/dialog-create-customers.component';

@Component({
  selector: 'app-edit-capital-increases',
  templateUrl: './edit-capital-increases.component.html',
  styleUrls: ['./edit-capital-increases.component.sass']
})
export class EditCapitalIncreasesComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly capitalIncreasesService: CapitalIncreasesService,
    private readonly navigationService: NavigationService,
    private readonly authService: AuthService,
    private readonly workersService: WorkersService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly matDialog: MatDialog,
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
  public payments: PaymentModel[] = [];
  public capitalIncreaseId: string = '';
  public user: UserModel|null = null;

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
    this.navigationService.setTitle('Editar incremento de capital');
    this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
      this.workers = workers;
    });

    this.handleAuth$ = this.authService.handleAuth().subscribe(auth => {
      this.user = auth.user;
    });

    this.activatedRoute.params.subscribe(params => {
      this.capitalIncreaseId = params.capitalIncreaseId;
      this.capitalIncreasesService.getCapitalIncreaseById(this.capitalIncreaseId).subscribe(capitalIncrease => {
        console.log(capitalIncrease);
        const { customer } = capitalIncrease;
        this.formGroup.patchValue(capitalIncrease)
        this.formGroup.patchValue({ customer });
        this.payments = capitalIncrease.payments;
      });
    });
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

  onDialogPayments() {
    const dialogRef = this.matDialog.open(DialogCreatePaymentsComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(payment => {
      if (payment) {
        this.payments.push(payment);
      }
    });
  }

  onRemovePayment(index: number) {
    this.payments.splice(index, 1);
  }

  onAttachPdf(type: string) {
    const data: DialogAttachPdfData = {
      capitalIncreaseId: this.capitalIncreaseId,
      type,
    } 
    this.matDialog.open(DialogAttachPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data: data
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const capitalIncrease = this.formGroup.value;
      capitalIncrease.customerId = capitalIncrease.customer._id;
      this.capitalIncreasesService.update(capitalIncrease, this.payments, this.capitalIncreaseId).subscribe(() => {
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
