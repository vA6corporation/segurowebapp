import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogExperiencesComponent } from 'src/app/experiences/dialog-experiences/dialog-experiences.component';
import { ExperienceModel } from 'src/app/experiences/experience.model';
import { DialogInvestmentsComponent } from 'src/app/investments/dialog-investments/dialog-investments.component';
import { InvestmentModel } from 'src/app/investments/investment.model';
import { DialogMovablePropertiesComponent } from 'src/app/movable-properties/dialog-movable-properties/dialog-movable-properties.component';
import { MovablePropertyModel } from 'src/app/movable-properties/movable-property.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogPropertiesComponent } from 'src/app/properties/dialog-properties/dialog-properties.component';
import { PropertyModel } from 'src/app/properties/property.model';
import { DialogShareholdersComponent } from 'src/app/shareholders/dialog-shareholders/dialog-shareholders.component';
import { ShareholderModel } from 'src/app/shareholders/shareholder.model';
import { BusinessesService } from '../businesses.service';
import { DialogAttachPdfComponent } from '../dialog-attach-pdf/dialog-attach-pdf.component';
import { DialogFacilityCreditsComponent } from '../dialog-facility-credits/dialog-facility-credits.component';
import { FacilityCreditModel } from '../facility-credit.model';

@Component({
  selector: 'app-edit-businesses',
  templateUrl: './edit-businesses.component.html',
  styleUrls: ['./edit-businesses.component.sass']
})
export class EditBusinessesComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly businessesService: BusinessesService,
    private readonly navigationService: NavigationService,
    private readonly route: ActivatedRoute,
    private readonly matDialog: MatDialog,
  ) { }
  
  public formGroup: FormGroup = this.formBuilder.group({
    documentType: [ null, Validators.required ],
    document: [ null, Validators.required ],
    name: [ null, Validators.required ],
    email: [ null, [ Validators.required, Validators.email ] ],
    mobileNumber: null,
    phoneNumber: null,
    annexed: null,
    address: null,
    inscriptionAt: null,
    
    representativeDocumentType: 'DNI',
    representativeDocument: null,
    representativeName: null,
    representativeNationality: null,
    representativeMaritalStatus: 'SOLTERO',
    representativePropertyRegime: '',
    representativeBirthDate: null,

    directoryPresident: null,
    directorySubPresident: null,
    directoryDirectories: null,
    directoryGeneralManager: null,
    directoryFinancierManager: null,

    operationSector: null,
    operationActivity: null,
    operationPlace: null,
    operationFinanciers: null,
    operationBanks: null
  });
  
  private businessId: string = '';
  public isLoading: boolean = false;
  public maxlength: number = 11;
  public shareholders: ShareholderModel[] = [];
  public properties: PropertyModel[] = [];
  public movableProperties: MovablePropertyModel[] = [];
  public investments: InvestmentModel[] = [];
  public experiences: ExperienceModel[] = [];
  public facilityCredits: FacilityCreditModel[] = [];

  ngOnInit(): void { 
    this.navigationService.setTitle('Editar empresa');
    this.navigationService.backTo();
    this.formGroup.get('documentType')?.valueChanges.subscribe(value => {
      switch (value) {
        case 'RUC':
          this.formGroup.get('documento')?.setValidators([ Validators.required, Validators.minLength(11), Validators.maxLength(11) ]);
          this.maxlength = 11;
          break;
        case 'DNI':
          this.formGroup.get('documento')?.setValidators([ Validators.required, Validators.minLength(8), Validators.maxLength(8) ]);
          this.maxlength = 8;
          break;
      }
      this.formGroup.get('documento')?.updateValueAndValidity();
    });

    this.route.params.subscribe(params => {
      this.businessId = params.businessId;
      this.businessesService.getBusinessById(this.businessId).subscribe(business => {
        console.log(business);
        
        this.shareholders = business.shareholders;
        this.properties = business.properties;
        this.movableProperties = business.movableProperties;
        this.investments = business.investments;
        this.experiences = business.experiences;
        this.facilityCredits = business.facilityCredits;
        this.formGroup.patchValue(business);
      });
    });
  }

  onDialogShareholders() {
    const dialogRef = this.matDialog.open(DialogShareholdersComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(shareholder => {
      if (shareholder) {
        this.shareholders.push(shareholder);
      }
    });
  }

  onDialogProperties() {
    const dialogRef = this.matDialog.open(DialogPropertiesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(property => {
      if (property) {
        this.properties.push(property);
      }
    });
  }

  onDialogMovableProperties() {
    const dialogRef = this.matDialog.open(DialogMovablePropertiesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(movableProperty => {
      if (movableProperty) {
        this.movableProperties.push(movableProperty);
      }
    });
  }

  onDialogInvestments() {
    const dialogRef = this.matDialog.open(DialogInvestmentsComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(investment => {
      if (investment) {
        this.investments.push(investment);
      }
    });
  }

  onDialogExperiences() {
    const dialogRef = this.matDialog.open(DialogExperiencesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(experience => {
      if (experience) {
        this.experiences.push(experience);
      }
    });
  }

  onDialogFacilityCredits() {
    const dialogRef = this.matDialog.open(DialogFacilityCreditsComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(facilityCredit => {
      if (facilityCredit) {
        this.facilityCredits.push(facilityCredit);
      }
    });
  }

  onRemoveShareholder(index: number) {
    this.shareholders.splice(index, 1);
  }

  onRemoveProperty(index: number) {
    this.properties.splice(index, 1);
  }

  onRemoveMovableProperty(index: number) {
    this.movableProperties.splice(index, 1);
  }

  onRemoveInvestment(index: number) {
    this.investments.splice(index, 1);
  }

  onRemoveExperience(index: number) {
    this.experiences.splice(index, 1);
  }

  onRemoveFacilityCredit(index: number) {
    this.facilityCredits.splice(index, 1);
  }

  onAttachPdfDocuments() {
    this.matDialog.open(DialogAttachPdfComponent, {
      width: '100vw',
      height: '90vh',
      position: { top: '20px' },
      data: this.businessId,
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();

      const business = this.formGroup.value;
      const shareholderIds = this.shareholders.map(e => e._id);
      Object.assign(business, { shareholderIds });

      this.businessesService.update(
        business, 
        this.experiences, 
        this.investments,
        this.properties,
        this.movableProperties,
        this.facilityCredits,
        this.businessId
      ).subscribe(res => {
        console.log(res);
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
