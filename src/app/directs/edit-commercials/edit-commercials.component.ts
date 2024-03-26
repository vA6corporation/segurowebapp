import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { BusinessModel } from 'src/app/businesses/business.model';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { ChequeModel } from 'src/app/cheques/cheque.model';
import { ChequesService } from 'src/app/cheques/cheques.service';
import { DialogChequesComponent } from 'src/app/cheques/dialog-cheques/dialog-cheques.component';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { DialogAttachPdfComponent } from 'src/app/constructions/dialog-attach-pdf/dialog-attach-pdf.component';
import { DialogConstructionsComponent } from 'src/app/constructions/dialog-constructions/dialog-constructions.component';
import { DepositModel } from 'src/app/deposits/deposit.model';
import { DepositsService } from 'src/app/deposits/deposits.service';
import { DialogDepositsComponent } from 'src/app/deposits/dialog-deposits/dialog-deposits.component';
import { DialogFinanciesComponent } from 'src/app/financiers/dialog-financiers/dialog-financiers.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
import { DialogPdfDirectsComponent, DirectPdfData } from '../dialog-pdf-directs/dialog-pdf-directs.component';
import { DirectsService } from '../directs.service';

@Component({
  selector: 'app-edit-commercials',
  templateUrl: './edit-commercials.component.html',
  styleUrls: ['./edit-commercials.component.sass']
})
export class EditCommercialsComponent implements OnInit {

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly directsService: DirectsService,
    private readonly chequesService: ChequesService,
    private readonly depositsService: DepositsService,
    private readonly navigationService: NavigationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly matDialog: MatDialog,
  ) { }

  public formGroup: UntypedFormGroup = this.formBuilder.group({
    financier: this.formBuilder.group({
      _id: [ null, Validators.required ],
      name: [ null, Validators.required ],
    }),
    beneficiary: this.formBuilder.group({
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
      guarantee: null,
      prima: null,
      isEmition: false,
      commission: null,
      currencyCode: 'PEN'
    }),
  });

  public construction: ConstructionModel|null = null;
  public business: BusinessModel|null = null;
  public partnership: PartnershipModel|null = null;
  private directId: string = '';
  public isLoading: boolean = false;
  public cheques: ChequeModel[] = [];
  public deposits: DepositModel[] = [];

  ngOnInit(): void { 
    this.navigationService.setTitle('Editar adelanto directo');
    this.activatedRoute.params.subscribe(params => {
      this.directId = params.directId;
      this.directsService.getDirectById(this.directId).subscribe(direct => {
        console.log(direct);
        const { financier, beneficiary, cheques = [], deposits = [], construction } = direct;
        this.formGroup.patchValue({ financier });
        this.formGroup.patchValue({ beneficiary });
        this.formGroup.patchValue({ direct });
        this.construction = construction;
        this.business = construction?.business || null;
        this.partnership = construction?.partnership || null;
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
    if (this.construction) {
      const data: DirectPdfData = {
        type: 'invoice',
        constructionId: this.construction._id,
        directId: this.directId
      }
  
      this.matDialog.open(DialogPdfDirectsComponent, {
        width: '100vw',
        height: '90vh',
        position: { top: '20px' },
        data,
      });
    }
  }

  onAttachPdfTicket() {
    if (this.construction) {
      const data: DirectPdfData = {
        type: 'voucher',
        constructionId: this.construction._id,
        directId: this.directId
      }
  
      this.matDialog.open(DialogPdfDirectsComponent, {
        width: '100vw',
        height: '90vh',
        position: { top: '20px' },
        data,
      });
    }
  }

  onAttachPdfDocuments() {
    if (this.construction) {
      const data: DirectPdfData = {
        type: 'document',
        constructionId: this.construction._id,
        directId: this.directId
      }
  
      this.matDialog.open(DialogPdfDirectsComponent, {
        width: '100vw',
        height: '90vh',
        position: { top: '20px' },
        data,
      });
    }
  }

  onAttachPdfCheques() {
    if (this.construction) {
      const data: DirectPdfData = {
        type: 'cheque',
        constructionId: this.construction._id,
        directId: this.directId
      }
  
      this.matDialog.open(DialogPdfDirectsComponent, {
        width: '100vw',
        height: '90vh',
        position: { top: '20px' },
        data,
      });
    }
  }

  onAttachPdfDeposits() {
    if (this.construction) {
      const data: DirectPdfData = {
        type: 'deposit',
        constructionId: this.construction._id,
        directId: this.directId
      }
  
      this.matDialog.open(DialogPdfDirectsComponent, {
        width: '100vw',
        height: '90vh',
        position: { top: '20px' },
        data,
      });
    }
  }

  onAttachPdfFianzas() {
    if (this.construction) {
      const data: DirectPdfData = {
        type: 'fianza',
        constructionId: this.construction._id,
        directId: this.directId
      }
  
      this.matDialog.open(DialogPdfDirectsComponent, {
        width: '100vw',
        height: '90vh',
        position: { top: '20px' },
        data,
      });
    }
  }

  onAttachPdfConstruction() {
    this.matDialog.open(DialogAttachPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data: this.construction?._id,
    });
  }

  onAttachPdfConstructions() {
    if (this.construction) {
      const data: DirectPdfData = {
        type: 'construction',
        constructionId: this.construction._id,
        directId: this.directId
      }
  
      this.matDialog.open(DialogPdfDirectsComponent, {
        width: '100vw',
        height: '90vh',
        position: { top: '20px' },
        data,
      });
    }
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

  onEditCheque(cheque: ChequeModel): void {
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
      const { financier, beneficiary, direct } = this.formGroup.value;
      direct.financierId = financier._id;
      direct.beneficiaryId = beneficiary._id;
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
