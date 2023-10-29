import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogTemplatePartnershipsComponent } from 'src/app/template-partnerships/dialog-template-partnerships/dialog-template-partnerships.component';
import { DialogAddGuarantiesComponent } from '../dialog-add-guaranties/dialog-add-guaranties.component';
import { TemplatesService } from '../templates.service';
import { DialogEditGuarantiesComponent, DialogEditGugaranteeData } from '../dialog-edit-guaranties/dialog-edit-guaranties.component';
import { PartnershipItemModel } from 'src/app/partnerships/partnership-item.model';

@Component({
  selector: 'app-edit-templates',
  templateUrl: './edit-templates.component.html',
  styleUrls: ['./edit-templates.component.sass']
})
export class EditTemplatesComponent implements OnInit {

  constructor(
    private readonly templatesService: TemplatesService,
    private readonly navigationService: NavigationService,
    private readonly matDialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
  ) { }
    
  private formBuilder: UntypedFormBuilder = new UntypedFormBuilder();
  public isLoading: boolean = false;
  public formGroup: UntypedFormGroup = this.formBuilder.group({
    object: [ null, Validators.required ],
    executionPlace: [ null, Validators.required ],
    startDate: [ null, Validators.required ],
    baseBudget: [ null, Validators.required ],
    contractMount: [ null, Validators.required ],
    depositorName: null,
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
    executionPeriodWork: [ null, Validators.required ],
    tenderNumber: null,
  });
  public guaranties: any[] = [];
  private templateId: string = '';
  public partnershipItems: PartnershipItemModel[] = [];

  private activatedRoute$: Subscription = new Subscription();

  ngOnDetroy() {
    this.activatedRoute$.unsubscribe();
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Editar documentacion');
    this.navigationService.backTo();

    this.activatedRoute$ = this.activatedRoute.params.subscribe(params => {
      this.templateId = params.templateId;
      this.templatesService.getTemplateById(this.templateId).subscribe(template => {
        const { business, partnership, beneficiary, guaranties, ...rest } = template;
        console.log(guaranties);
        this.formGroup.patchValue(rest);
        this.formGroup.get('business')?.patchValue(business);
        this.formGroup.get('beneficiary')?.patchValue(beneficiary);
        this.guaranties = guaranties;
        if (partnership?.partnershipItems) {
          this.partnershipItems = partnership.partnershipItems;
        }
        if (partnership) {
          this.formGroup.get('partnership')?.patchValue(partnership);
        }
      });
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

  openDialogAddGuaranties() {
    if(this.formGroup.controls['contractMount'].value == null){
      this.navigationService.showMessage('Debe agregar el monto del contrato');
      return
    }
    const dialogRef = this.matDialog.open(DialogAddGuarantiesComponent, {
      width: '600px',
      position: { top: '20px' },
      data: this.formGroup.value.contractMount,
    });

    dialogRef.afterClosed().subscribe(guarantee => {
      if (guarantee) {
        this.guaranties.push(guarantee);
      }
    });
  }

  onRemoveGuarantee(index: number) {
    this.guaranties.splice(index, 1);
  }

  onEditGuarantee(index: number) {
    const { contractMount } = this.formGroup.value;
    if (contractMount) {
      const guarantee = this.guaranties[index];
      const data: DialogEditGugaranteeData = {
        guarantee,
        contractMount,
      };

      const dialogRef = this.matDialog.open(DialogEditGuarantiesComponent, {
        width: '600px',
        position: { top: '20px' },
        data,
      });
  
      dialogRef.afterClosed().subscribe(guarantee => {
        if (guarantee) {
          this.guaranties.splice(index, 1, guarantee);
        }
      });
    } else {
      this.navigationService.showMessage('Debe agregar el monto del contrato');
    }
  }

  openDialogPartnerships() {
    const dialogRef = this.matDialog.open(DialogTemplatePartnershipsComponent, {
      width: '600px',
      position: { top: '20px' }
    });
    
    dialogRef.afterClosed().subscribe(partnership => {
      if (partnership) {
        const { business, partnershipItems } = partnership;
        this.partnershipItems = partnershipItems;
        this.formGroup.patchValue({ business: business || {} });
        this.formGroup.patchValue({ partnership: partnership || {} });
      }
    });
  }

  async onSubmit() {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();
      const { business, partnership, beneficiary, ...template } = this.formGroup.value;
      template.businessId = business._id;
      template.partnershipId = partnership._id;
      template.beneficiaryId = beneficiary._id;
      Object.assign(template, { guaranties: this.guaranties });
      this.templatesService.update(template, this.templateId).subscribe(() => {
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
