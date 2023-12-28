import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BoardMembersModel } from 'src/app/board-members/board-members.model';
import { DialogBoardMembersComponent } from 'src/app/board-members/dialog-board-members/dialog-board-members.component';
import { DialogEditExperiencesComponent } from 'src/app/experiences/dialog-edit-experiences/dialog-edit-experiences.component';
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
import { WorkerModel } from 'src/app/workers/worker.model';
import { WorkersService } from 'src/app/workers/workers.service';
import { BusinessModel } from '../business.model';
import { BusinessesService } from '../businesses.service';
import { AccessCreditModel } from '../dialog-add-access-credit/access-credit.model';
import { DialogAddAccessCreditComponent } from '../dialog-add-access-credit/dialog-add-access-credit.component';
import { AccountRotationModel } from '../dialog-add-account-rotation/account-rotation.model';
import { DialogAddAccountRotationComponent } from '../dialog-add-account-rotation/dialog-add-account-rotation.component';
import { DialogAddGuarantiesComponent } from '../dialog-add-guaranties/dialog-add-guaranties.component';
import { GuarantiesModel } from '../dialog-add-guaranties/guaranties.model';
import { DialogAddMainCustomersComponent } from '../dialog-add-main-customers/dialog-add-main-customers.component';
import { MainCustomersModel } from '../dialog-add-main-customers/main-customers.model';
import { DialogAddMainSuppliersComponent } from '../dialog-add-main-suppliers/dialog-add-main-suppliers.component';
import { MainSuppliersModel } from '../dialog-add-main-suppliers/main-suppliers.model';
import { DialogAddSalesmixComponent } from '../dialog-add-salesmix/dialog-add-salesmix.component';
import { SalesMixModel } from '../dialog-add-salesmix/sales-mix.model';
import { DialogAddTrialsComponent } from '../dialog-add-trials/dialog-add-trials.component';
import { TrialsModel } from '../dialog-add-trials/trials.model';
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
        private readonly formBuilder: UntypedFormBuilder,
        private readonly businessesService: BusinessesService,
        private readonly navigationService: NavigationService,
        private readonly workersService: WorkersService,
        private readonly router: Router,
        private readonly matDialog: MatDialog
    ) { }

    public formGroup: UntypedFormGroup = this.formBuilder.group({
        isOnlyPartnership: false,
        observations: '',
        documentType: ['', Validators.required],
        document: ['', Validators.required],
        electronicDeparture: '',
        registryArea: '',
        publicDeed: '',
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        emailTwo: ['', Validators.email],
        mobileNumber: '',
        phoneNumber: '',
        annexed: '',
        inscriptionAt: null,
        workerId: ['', Validators.required],

        turnOfBusiness: '',
        sourcesOfIncome: '',
        countrySource: '',
        amountUse: '',
        countryOrigin: '',
        districtOrigin: '',
        provinceOrigin: '',
        departmentOrigin: '',
        addressOrigin: '',
        countryRecidence: '',
        districtRecidence: '',
        provinceRecidence: '',
        departmentRecidence: '',
        addressRecidence: '',

        UIF: false,
        hasComplianceOfficer: false,
        managementManualLAFT: false,
        codeEthicsConduct: false,
        carryReviewClients: false,
        madeMakeInvestments: false,
        companyEverBeenInvestigated: false,

        osceRegister: '',
        osceHiring: '',
        osceExpiration: '',
        osceCertifiedDate: null,
        osceObservation: '',

        representativeSalary: '',
        representativeLivingPlacePay: '',
        representativeLivingPlacePrice: '',
        representativeGender: '',
        representativeStudies: '',
        representativeLivingPlace: '',
        representativePosition: '',
        representativeYearsOfService: '',
        representativeCountryOrigin: '',
        representativeCountryResidence: '',

        representativeDistrictResidence: '',
        representativeProvinceResidence: '',
        representativeDepartmentResidence: '',
        representativeAddressResidence: '',
        representativeMobileNumber: '',
        representativePhoneNumber: '',

        representativeProfessionOccupation: '',
        representativeEmail: '',
        representativePEPInstitution: '',
        representativePEPPositionn: '',

        representativeDocumentType: 'DNI',
        representativeDocument: '',
        representativeName: '',
        representativeNationality: '',
        representativeMaritalStatus: 'SOLTERO',
        representativePropertyRegime: '',
        representativeBirthDate: null,
        representativeCrimeStatus: '',
        representativeCrimeYear: '',
        representativeCrime: '',

        representativeSpouseDocumentType: '',
        representativeSpouseDocument: '',
        representativeSpouseName: '',
        representativeSpouseNationality: '',
        representativeSpouseMaritalStatus: '',
        representativeSpousePropertyRegime: '',
        representativeSpouseBirthDate: null,
        representativeSpouseProfessionOccupation: '',
        representativeSpouseGender: '',
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

    public salesMix: SalesMixModel[] = [];
    public mainSuppliers: MainSuppliersModel[] = [];
    public mainCustomers: MainCustomersModel[] = [];
    public accessCredit: AccessCreditModel[] = [];
    public accountRotation: AccountRotationModel[] = [];
    public trials: TrialsModel[] = [];
    public workers: WorkerModel[] = [];

    private handleWorkers$: Subscription = new Subscription();

    ngOnDestroy() {
        this.handleWorkers$.unsubscribe();
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Nueva empresa');
        this.navigationService.backTo();

        this.handleWorkers$ = this.workersService.handleWorkers().subscribe(workers => {
            this.workers = workers;
        });

        this.formGroup.get('documentType')?.valueChanges.subscribe(value => {
            switch (value) {
                case 'RUC':
                    this.formGroup.get('documento')?.setValidators([Validators.required, Validators.minLength(11), Validators.maxLength(11)]);
                    this.maxlength = 11;
                    break;
                case 'DNI':
                    this.formGroup.get('documento')?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
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

    onDialogEditExperience(index: number) {
        const dialogRef = this.matDialog.open(DialogEditExperiencesComponent, {
            width: '600px',
            position: { top: '20px' },
            data: this.experiences[index],
        });

        dialogRef.afterClosed().subscribe(experience => {
            if (experience) {
                Object.assign(this.experiences[index], experience);
                // this.experiences.push(experience);
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

    onDialogAddSalesmix() {
        const dialogRef = this.matDialog.open(DialogAddSalesmixComponent, {
            width: '600px',
            position: { top: '20px' },
        });

        dialogRef.afterClosed().subscribe((salesMixItem) => {
            if (salesMixItem) {
                this.salesMix.push(salesMixItem);
            }
        });
    }

    onDialogAddMainSuppliers() {
        const dialogRef = this.matDialog.open(DialogAddMainSuppliersComponent, {
            width: '600px',
            position: { top: '20px' },
        });

        dialogRef.afterClosed().subscribe((mainSupplier) => {
            if (mainSupplier) {
                this.mainSuppliers.push(mainSupplier);
            }
        });
    }

    onDialogAddMainCustomers() {
        const dialogRef = this.matDialog.open(DialogAddMainCustomersComponent, {
            width: '600px',
            position: { top: '20px' },
        });

        dialogRef.afterClosed().subscribe((mainCustomer) => {
            if (mainCustomer) {
                this.mainCustomers.push(mainCustomer);
            }
        });
    }

    onDialogAddAccessCredit() {
        const dialogRef = this.matDialog.open(DialogAddAccessCreditComponent, {
            width: '600px',
            position: { top: '20px' },
        });

        dialogRef.afterClosed().subscribe((accessCreditItem) => {
            if (accessCreditItem) {
                this.accessCredit.push(accessCreditItem);
            }
        });
    }

    onDialogAddAccountRotation() {
        const dialogRef = this.matDialog.open(DialogAddAccountRotationComponent, {
            width: '600px',
            position: { top: '20px' },
        });

        dialogRef.afterClosed().subscribe((accountRotationItem) => {
            if (accountRotationItem) {
                this.accountRotation.push(accountRotationItem);
            }
        });
    }

    onDialogAddJudgment() {
        const dialogRef = this.matDialog.open(DialogAddTrialsComponent, {
            width: '600px',
            position: { top: '20px' },
        });

        dialogRef.afterClosed().subscribe((Judgment) => {
            if (Judgment) {
                this.trials.push(Judgment);
            }
        });
    }

    onRemoveJudgment(index: number) {
        this.trials.splice(index, 1);
    }

    onRemoveAccountRotation(index: number) {
        this.accountRotation.splice(index, 1);
    }

    onRemoveAccessCredit(index: number) {
        this.accessCredit.splice(index, 1);
    }

    onRemoveMainCustomers(index: number) {
        this.mainCustomers.splice(index, 1);
    }

    onRemoveMainSuppliers(index: number) {
        this.mainSuppliers.splice(index, 1);
    }

    onRemoveSalesmix(index: number) {
        this.salesMix.splice(index, 1);
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
            business.salesMix = this.salesMix
            business.mainSuppliers = this.mainSuppliers
            business.mainCustomers = this.mainCustomers
            business.accessCredit = this.accessCredit
            business.accountRotation = this.accountRotation
            business.trials = this.trials

            if (!this.isCheckedPEP) {
                business.representativePEPInstitution = '';
                business.representativePEPPositionn = '';
            }
            if (!this.isCheckedCrime) {
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
