import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPartnershipsComponent } from 'src/app/partnerships/dialog-partnerships/dialog-partnerships.component';
import { DialogAttachFileComponent } from '../dialog-attach-file/dialog-attach-file.component';
import { OperationsService } from '../operations.service';
import { BusinessModel } from 'src/app/businesses/business.model';
import { PartnershipItemModel } from 'src/app/partnerships/partnership-item.model';
import { DialogAttachPdfComponent, DialogAttachPdfData, Types } from 'src/app/businesses/dialog-attach-pdf/dialog-attach-pdf.component';

@Component({
  selector: 'app-edit-operations',
  templateUrl: './edit-operations.component.html',
  styleUrls: ['./edit-operations.component.sass']
})
export class EditOperationsComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly operationsService: OperationsService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  public formGroup: UntypedFormGroup = this.formBuilder.group({
    name: [ null, Validators.required ],
    partnership: this.formBuilder.group({
      _id: null,
      name: null,
    }),
    business: this.formBuilder.group({
      name: [ null, Validators.required ],
      _id: [ null, Validators.required ],
    }),
  });
  public isLoading: boolean = false;
  public hide: boolean = true;
  private operationId: string = '';
  private params$: Subscription = new Subscription();
  public businesses: BusinessModel[] = [];

  ngOnDestroy() {
    this.params$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Editar operacion');
    this.navigationService.backTo();

    this.params$ = this.activatedRoute.params.subscribe(params => {
      this.operationId = params['operationId'];
      this.operationsService.getOperationById(this.operationId).subscribe(operation => {
        if (operation.partnership) {
          this.businesses = operation.partnership.partnershipItems.map(e => e.business);
        } else {
          this.businesses = [operation.business];
        }
        this.formGroup.patchValue(operation);
      });
    });
  }

  onAttachFile() {
    const dialogRef = this.matDialog.open(DialogAttachFileComponent, {
      width: '80vw',
      height: '90vh',
      position: { top: '20px' },
      data: this.operationId
    });

    // dialogRef.componentInstance.handleChangePdf().subscribe(() => {
    //   this.fetchData();
    // });
  }

  onDialogAttachPdfDocuments(businessId: string) {
    const data: DialogAttachPdfData = {
      businessId,
      type: Types.DOCUMENT,
    } 

    this.matDialog.open(DialogAttachPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }
  
  onDialogAttachPdfExperiences(businessId: string) {
    const data: DialogAttachPdfData = {
      businessId: businessId,
      type: Types.EXPERIENCE,
    } 

    this.matDialog.open(DialogAttachPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  onDialogAttachPdfFinancials(businessId: string) {
    const data: DialogAttachPdfData = {
      businessId: businessId,
      type: Types.FINANCIAL,
    } 

    this.matDialog.open(DialogAttachPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data,
    });
  }

  openDialogPartnerships() {
    const dialogRef = this.matDialog.open(DialogPartnershipsComponent, {
      width: '600px',
      position: { top: '20px' }
    });
    
    dialogRef.afterClosed().subscribe(partnership => {
      if (partnership) {
        const { business, partnershipItems } = partnership;
        this.businesses = partnershipItems.map((e: PartnershipItemModel) => e.business);
        this.formGroup.patchValue({ business: business || {} });
        this.formGroup.patchValue({ partnership: partnership || {} });
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
        this.businesses = [business];
        this.formGroup.patchValue({ partnership: {} });
        this.formGroup.patchValue({ business });
      }
    });
  }
  
  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { business, partnership, ...operation } = this.formGroup.value;
      operation.businessId = business._id;
      operation.partnershipId = partnership._id;
      this.operationsService.update(operation, this.operationId).subscribe(() => {
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
