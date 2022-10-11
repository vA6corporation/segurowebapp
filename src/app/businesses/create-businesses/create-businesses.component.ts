import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BoardMembersModel } from 'src/app/board-members/board-members.model';
import { DialogBoardMembersComponent } from 'src/app/board-members/dialog-board-members/dialog-board-members.component';
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
import { BusinessModel } from '../business.model';
import { BusinessesService } from '../businesses.service';
import { DialogAddGuarantiesComponent } from '../dialog-add-guaranties/dialog-add-guaranties.component';
import { GuarantiesModel } from '../dialog-add-guaranties/guaranties.model';
import { DialogBusinessesComponent } from '../dialog-businesses/dialog-businesses.component';
import { DialogFacilityCreditsComponent } from '../dialog-facility-credits/dialog-facility-credits.component';
import { FacilityCreditModel } from '../facility-credit.model';

@Component({
  selector: 'app-create-businesses',
  templateUrl: './create-businesses.component.html',
  styleUrls: ['./create-businesses.component.sass']
})
export class CreateBusinessesComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly businessesService: BusinessesService,
    private readonly navigationService: NavigationService,
    private readonly router: Router,
    private readonly matDialog: MatDialog
  ) { }
    
  public formGroup: FormGroup = this.formBuilder.group({
    documentType: [null, Validators.required],
    document: [null, Validators.required],
    name: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    authorizedSignatures: null,
    mobileNumber: null,
    phoneNumber: null,
    annexed: null,
    inscriptionAt: null,

    turnOfBusiness: null,
    countryOrigin: null,
    districtOrigin: null,
    provinceOrigin: null,
    departmentOrigin: null,
    addressOrigin: null,
    countryRecidence: null,
    districtRecidence: null,
    provinceRecidence: null,
    departmentRecidence: null,
    addressRecidence: null,

    UIF: null,
    hasComplianceOfficer: null,
    managementManualLAFT: null,
    codeEthicsConduct: null,
    carryReviewClients: null,
    madeMakeInvestments: null,
    companyEverBeenInvestigated: null,

    osceRegister: null,
    osceHiring: null,
    osceExpiration: null,
    osceCertifiedDate: null,
    osceObservation: null,

    representativePosition: null,
    representativeYearsOfService: null,
    representativeCountryOrigin: null,
    representativeCountryResidence: null,
    representativeProfessionOccupation: null,
    representativeEmail: null,
    representativePEPInstitution: null,
    representativePEPPositionn: null,

    representativeDocumentType: 'DNI',
    representativeDocument: null,
    representativeName: null,
    representativeNationality: null,
    representativeMaritalStatus: 'SOLTERO',
    representativePropertyRegime: '',
    representativeBirthDate: null,
    representativeCrimeStatus: null,
    representativeCrimeYear: null,
    representativeCrime: null,

    representativeSpouseDocumentType: null,
    representativeSpouseDocument: null,
    representativeSpouseName: null,
    representativeSpouseNationality: null,
    representativeSpouseMaritalStatus: null,
    representativeSpousePropertyRegime: null,
    representativeSpouseBirthDate: null,

    operationSector: null,
    operationActivity: null,
    operationPlace: null,
    operationFinanciers: null,
    operationBanks: null
  });

  public isLoading: boolean = false;
  public maxlength: number = 11;
  public shareholders: ShareholderModel[] = [];
  public properties: PropertyModel[] = [];
  public movableProperties: MovablePropertyModel[] = [];
  public investments: InvestmentModel[] = [];
  public experiences: ExperienceModel[] = [];
  public facilityCredits: FacilityCreditModel[] = [];
  public linkedBusinesses: BusinessModel[] = [];
  public guaranties: GuarantiesModel[] = [];
  public isCheckedPEP = false;
  public isCheckedCrime = false;
  public boardMembers: BoardMembersModel[] = [];
  
  ngOnInit(): void { 
    this.navigationService.setTitle('Nueva empresa');
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
  }

  onDialogBoardMembers() {
    const dialogRef = this.matDialog.open(DialogBoardMembersComponent, {
      width: '600px',
      position: { top: '20px' },
    });

    dialogRef.afterClosed().subscribe((boardMemberItem) => {
      if (boardMemberItem) {
        this.boardMembers.push(boardMemberItem);
      }
    });
  }

  onDialogLinkedBusinesses() {
    const dialogRef = this.matDialog.open(DialogBusinessesComponent, {
      width: '600px',
      position: { top: '20px' }
    });

    dialogRef.afterClosed().subscribe(business => {
      if (business) {
        this.linkedBusinesses.push(business);
      }
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

  onDialogAddGuaranties() {
    const dialogRef = this.matDialog.open(DialogAddGuarantiesComponent, {
      width: '600px',
      position: { top: '20px' },
    });

    dialogRef.afterClosed().subscribe((guarantee) => {
      if (guarantee) {
        this.guaranties.push(guarantee);
      }
    });
  }

  onRemoveBoardMembers(index: number) {
    this.boardMembers.splice(index, 1);
  }

  onRemoveLinkedBusinesses(index: number) {
    this.linkedBusinesses.splice(index, 1);
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

  onRemoveGuaranties(index: number) {
    this.guaranties.splice(index, 1);
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      this.navigationService.loadBarStart();

      const business = this.formGroup.value;
      const shareholderIds = this.shareholders.map(e => e._id);
      const linkedBusinessesIds = this.linkedBusinesses.map((e) => e._id);
      Object.assign(business, { shareholderIds, linkedBusinessesIds });
      business.boardMembers = this.boardMembers;
      if(!this.isCheckedPEP){
        business.representativePEPInstitution = '';
        business.representativePEPPositionn = '';
      }
      if(!this.isCheckedCrime){
        business.representativeCrimeStatus = '';
        business.representativeCrimeYearme = '';
        business.representativeCrime = '';
      }

      this.businessesService.create(
        business, 
        this.guaranties,
        this.experiences, 
        this.investments,
        this.properties,
        this.movableProperties,
        this.facilityCredits,
      ).subscribe(res => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.router.navigate(['/businesses']);
        this.navigationService.showMessage('Registrador correctamente');
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.navigationService.loadBarFinish();
        this.navigationService.showMessage(error.error.message);
      });
    }
  }

}
