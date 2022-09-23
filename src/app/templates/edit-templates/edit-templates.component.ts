import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogBeneficiariesComponent } from 'src/app/beneficiaries/dialog-beneficiaries/dialog-beneficiaries.component';
import { DialogBusinessesComponent } from 'src/app/businesses/dialog-businesses/dialog-businesses.component';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogTemplatePartnershipsComponent } from 'src/app/template-partnerships/dialog-template-partnerships/dialog-template-partnerships.component';
import { TemplatesService } from '../templates.service';

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
    
  private formBuilder: FormBuilder = new FormBuilder();
  public isLoading: boolean = false;
  public formGroup: FormGroup = this.formBuilder.group({
    object: [ null, Validators.required ],
    executionPlace: [ null, Validators.required ],
    guaranteeCode: [ null, Validators.required ],
    guaranteeTimeLimit: [ null, Validators.required ],
    guaranteeBaseBudget: [ null, Validators.required ],
    guaranteeMount: [ null, Validators.required ],
    guaranteeContractMount: [ null, Validators.required ],
    depositorName: [ null, Validators.required ],
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
  });
  private templateId: string = '';

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
        const { business, partnership, beneficiary, ...rest } = template;
        this.formGroup.patchValue(rest);
        this.formGroup.get('business')?.patchValue(business);
        this.formGroup.get('beneficiary')?.patchValue(beneficiary);
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

  openDialogPartnerships() {
    const dialogRef = this.matDialog.open(DialogTemplatePartnershipsComponent, {
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
      const { business, partnership, beneficiary, ...template } = this.formGroup.value;
      template.businessId = business._id;
      template.partnershipId = partnership._id;
      template.beneficiaryId = beneficiary._id;
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
