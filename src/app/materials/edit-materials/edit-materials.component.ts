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
import { MaterialsService } from '../materials.service';
import { Cheque } from 'src/app/cheques/cheque.model';
import { Deposit } from 'src/app/deposits/deposit.model';
import { DialogChequesComponent } from 'src/app/cheques/dialog-cheques/dialog-cheques.component';
import { DialogDepositsComponent } from 'src/app/deposits/dialog-deposits/dialog-deposits.component';
import { ChequesService } from 'src/app/cheques/cheques.service';
import { DepositsService } from 'src/app/deposits/deposits.service';
import { DialogPdfMaterialsComponent, MaterialPdfData } from '../dialog-pdf-materials/dialog-pdf-materials.component';
import { ConstructionModel } from 'src/app/constructions/construction.model';
import { DialogConstructionsComponent } from 'src/app/constructions/dialog-constructions/dialog-constructions.component';
import { CustomerModel } from 'src/app/customers/customer.model';
import { PartnershipModel } from 'src/app/partnerships/partnership.model';
import { BeneficiaryModel } from 'src/app/beneficiaries/beneficiary.model';
import { WorkerModel } from 'src/app/workers/worker.model';

@Component({
  selector: 'app-edit-materials',
  templateUrl: './edit-materials.component.html',
  styleUrls: ['./edit-materials.component.sass']
})
export class EditMaterialsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly materialsService: MaterialsService,
    private readonly chequesService: ChequesService,
    private readonly depositsService: DepositsService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly route: ActivatedRoute,
  ) { }

  public formGroup: FormGroup = this.formBuilder.group({
    financier: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
    material: this.formBuilder.group({
      constructionId: '',
      policyNumber: [ null, Validators.required ],
      object: null,
      price: [ null, Validators.required ],
      startDate: [null, Validators. required ],
      endDate: [ null, Validators.required ],
      voucherAt: null,
      guarantee: null,
      prima: null,
      isEmition: false,
      isPaid: false,
      commission: null,
      currency: 'PEN',
    }),
  });

  public isLoading: boolean = false;
  private materialId: string = '';
  public cheques: Cheque[] = [];
  public deposits: Deposit[] = [];
  public construction: ConstructionModel|null = null;
  public customer: CustomerModel|null = null;
  public partnership: PartnershipModel|null = null;
  public beneficiary: BeneficiaryModel|null = null;
  public worker: WorkerModel|null = null;

  ngOnInit(): void { 
    this.navigationService.setTitle('Editar adelanto de materiales');
    this.navigationService.backTo();
    this.route.params.subscribe(params => {
      this.materialId = params.materialId;
      this.materialsService.getMaterialById(this.materialId).subscribe(material => {
        const { customer, financier, partnership, beneficiary, cheques = [], deposits = [], construction } = material;
        this.formGroup.patchValue({ customer });
        this.formGroup.patchValue({ financier });
        this.formGroup.patchValue({ partnership: partnership || {} });
        this.formGroup.patchValue({ material });
        this.construction = construction;
        this.beneficiary = beneficiary || null;
        this.customer = construction?.customer || null;
        this.partnership = construction?.partnership || null;
        this.worker = material.worker;
        this.cheques = cheques;
        this.deposits = deposits;
      });
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
        this.formGroup.patchValue({ material: { constructionId: construction._id } });
      }
    });
  }

  onAttachPdfInvoice() {
    const data: MaterialPdfData = {
      type: 'invoice',
      materialId: this.materialId
    }

    this.matDialog.open(DialogPdfMaterialsComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfTicket() {
    const data: MaterialPdfData = {
      type: 'voucher',
      materialId: this.materialId
    }

    this.matDialog.open(DialogPdfMaterialsComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfDocuments() {
    const data: MaterialPdfData = {
      type: 'document',
      materialId: this.materialId
    }

    this.matDialog.open(DialogPdfMaterialsComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfCheques() {
    const data: MaterialPdfData = {
      type: 'cheque',
      materialId: this.materialId
    }

    this.matDialog.open(DialogPdfMaterialsComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfDeposits() {
    const data: MaterialPdfData = {
      type: 'deposit',
      materialId: this.materialId
    }

    this.matDialog.open(DialogPdfMaterialsComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfFianzas() {
    const data: MaterialPdfData = {
      type: 'fianza',
      materialId: this.materialId
    }

    this.matDialog.open(DialogPdfMaterialsComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onAttachPdfConstructions() {
    const data: MaterialPdfData = {
      type: 'construction',
      materialId: this.materialId
    }

    this.matDialog.open(DialogPdfMaterialsComponent, {
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
    const ok = confirm('Esta seguro de aliminar?...');
    if (ok) {
      const deposit = this.deposits[index];
      this.deposits.splice(index, 1);
      this.depositsService.deleteOne(deposit._id || '').subscribe(() => {
        this.navigationService.showMessage('Se han guardado los cambios');
      });
    }
  }

  openDialogCustomer() {
    const dialogRef = this.matDialog.open(DialogCustomersComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(customer => {
      this.formGroup.patchValue({ customer: customer || {} });
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
        cheque.onModel = 'Material';
        cheque.guaranteeId = this.materialId;
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

    dialogRef.afterClosed().subscribe(async deposit => {
      if (deposit) {
        this.deposits.push(deposit);
        deposit.onModel = 'Material';
        deposit.guaranteeId = this.materialId;
        await this.depositsService.create(deposit).toPromise();
        this.navigationService.showMessage('Se han guardado los cambios');
      }
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { financier, material } = this.formGroup.value;
      material.financierId = financier._id;
      this.materialsService.update(material, this.materialId).subscribe(res => {
        console.log(res);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage('Se han guardado los cambios');
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
