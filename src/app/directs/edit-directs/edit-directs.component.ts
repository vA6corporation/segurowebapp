import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogCustomersComponent } from 'src/app/customers/dialog-customers/dialog-customers.component';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DirectsService } from '../directs.service';
import { Cheque } from 'src/app/cheques/cheque.model';
import { Deposit } from 'src/app/deposits/deposit.model';
import { DialogChequesComponent } from 'src/app/cheques/dialog-cheques/dialog-cheques.component';
import { DialogDepositsComponent } from 'src/app/deposits/dialog-deposits/dialog-deposits.component';
import { ChequesService } from 'src/app/cheques/cheques.service';
import { DepositsService } from 'src/app/deposits/deposits.service';
import { DialogPdfDirectsComponent, DirectPdfData } from '../dialog-pdf-directs/dialog-pdf-directs.component';
import { DialogConstructionsComponent } from 'src/app/constructions/dialog-constructions/dialog-constructions.component';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { CustomerModel } from 'src/app/customers/customer.model';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
import { BeneficiaryModel } from 'src/app/beneficiaries/beneficiary.model';
import { WorkerModel } from 'src/app/workers/worker.model';

@Component({
  selector: 'app-edit-directs',
  templateUrl: './edit-directs.component.html',
  styleUrls: ['./edit-directs.component.sass']
})
export class EditDirectsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly directsService: DirectsService,
    private readonly chequesService: ChequesService,
    private readonly depositsService: DepositsService,
    private readonly navigationService: NavigationService,
    private readonly route: ActivatedRoute,
    private readonly matDialog: MatDialog,
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    financier: this.formBuilder.group({
      _id: [ null, Validators.required ],
      name: [ null, Validators.required ],
    }),
    direct: this.formBuilder.group({
      constructionId: '',
      _id: [ null, Validators.required ],
      policyNumber: [ null, Validators.required ],
      object: null,
      price: [ null, Validators.required ],
      startDate: [ null, Validators.required ],
      endDate: [ null, Validators.required ],
      voucherAt: null,
      guarantee: null,
      prima: null,
      isEmition: false,
      isPaid: false,
      commission: null,
      currency: 'PEN'
    }),
  });

  public construction: ConstructionModel|null = null;
  public customer: CustomerModel|null = null;
  public partnership: PartnershipModel|null = null;
  public beneficiary: BeneficiaryModel|null = null;
  private directId: string = '';
  public isLoading: boolean = false;
  public cheques: Cheque[] = [];
  public deposits: Deposit[] = [];
  public worker: WorkerModel|null = null;

  ngOnInit(): void { 
    this.navigationService.setTitle('Editar adelanto directo');
    this.navigationService.backTo();
    this.route.params.subscribe(params => {
      this.directId = params.directId;
      this.directsService.getDirectById(this.directId).subscribe(direct => {
        console.log(direct);
        const { financier, beneficiary, cheques = [], deposits = [], construction } = direct;
        this.formGroup.patchValue({ financier });
        this.formGroup.patchValue({ direct });
        this.construction = construction;
        this.beneficiary = beneficiary;
        this.customer = construction?.customer || null;
        this.partnership = construction?.partnership || null;
        this.worker = direct.worker;
        this.cheques = cheques;
        this.deposits = deposits;
      });
    });;
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
        this.formGroup.patchValue({ direct: { constructionId: construction._id } });
      }
    });
  }

  onAttachPdfInvoice() {
    const data: DirectPdfData = {
      type: 'invoice',
      directId: this.directId
    }

    this.matDialog.open(DialogPdfDirectsComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfTicket() {
    const data: DirectPdfData = {
      type: 'voucher',
      directId: this.directId
    }

    this.matDialog.open(DialogPdfDirectsComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfDocuments() {
    const data: DirectPdfData = {
      type: 'document',
      directId: this.directId
    }

    this.matDialog.open(DialogPdfDirectsComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfCheques() {
    const data: DirectPdfData = {
      type: 'cheque',
      directId: this.directId
    }

    this.matDialog.open(DialogPdfDirectsComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfDeposits() {
    const data: DirectPdfData = {
      type: 'deposit',
      directId: this.directId
    }

    this.matDialog.open(DialogPdfDirectsComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfFianzas() {
    const data: DirectPdfData = {
      type: 'fianza',
      directId: this.directId
    }

    this.matDialog.open(DialogPdfDirectsComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfConstructions() {
    const data: DirectPdfData = {
      type: 'construction',
      directId: this.directId
    }

    this.matDialog.open(DialogPdfDirectsComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }


  removeCheque(index: number): void {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      const cheque = this.cheques[index];
      this.chequesService.deleteOne(cheque._id).subscribe(() => {
        this.cheques.splice(index, 1);
        this.navigationService.showMessage('Eliminado correctamente');
      }, (error: HttpErrorResponse) => {
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

  removeDeposit(index: number): void {
    const ok = confirm('Esta seguro de eliminar?...');
    if (ok) {
      const deposit = this.deposits[index];
      this.deposits.splice(index, 1);
      this.depositsService.deleteOne(deposit._id || '').toPromise();
      this.navigationService.showMessage('Se han guardado los cambios');
    }
  }

  openDialogCustomer() {
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
        const { customer } = partnership;
        this.formGroup.patchValue({ customer: customer || {} });
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
        cheque.onModel = 'Direct';
        cheque.guaranteeId = this.directId;
        this.chequesService.create(cheque).subscribe(cheque => {
          this.cheques.push(cheque);
          this.navigationService.showMessage('Se han guardado los cambios');
        });
      }
    });
  }

  onEditCheque(cheque: Cheque): void {
    const dialogRef = this.matDialog.open(DialogChequesComponent, {
      width: '600px',
      position: { top: '20px' },
      data: cheque,
    });

    dialogRef.afterClosed().subscribe(async updatedCheque => {
      if (updatedCheque) {
        Object.assign(cheque, updatedCheque);
        await this.chequesService.update(updatedCheque, cheque._id).toPromise();
        this.navigationService.showMessage('Se han guardado los cambios');
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
        deposit.onModel = 'Direct';
        deposit.guaranteeId = this.directId;
        this.depositsService.create(deposit).toPromise();
        this.navigationService.showMessage('Se han guardado los cambios');
      }
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { financier, direct } = this.formGroup.value;
      direct.financierId = financier._id;
      this.directsService.update(direct, this.directId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Se han guardado los cambios');
      });
    }
  }

}
