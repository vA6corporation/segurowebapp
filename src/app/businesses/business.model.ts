import { BoardMembersModel } from '../board-members/board-members.model';
import { ExperienceModel } from '../experiences/experience.model';
import { InvestmentModel } from '../investments/investment.model';
import { MovablePropertyModel } from '../movable-properties/movable-property.model';
import { PropertyModel } from '../properties/property.model';
import { ShareholderModel } from '../shareholders/shareholder.model';
import { SurveyModel } from '../surveys/survey.model';
import { WorkerModel } from '../workers/worker.model';
import { AccessCreditModel } from './dialog-add-access-credit/access-credit.model';
import { AccountRotationModel } from './dialog-add-account-rotation/account-rotation.model';
import { GuarantiesModel } from './dialog-add-guaranties/guaranties.model';
import { MainCustomersModel } from './dialog-add-main-customers/main-customers.model';
import { MainSuppliersModel } from './dialog-add-main-suppliers/main-suppliers.model';
import { SalesMixModel } from './dialog-add-salesmix/sales-mix.model';
import { TrialsModel } from './dialog-add-trials/trials.model';
import { FacilityCreditModel } from './facility-credit.model';

export interface BusinessModel {
  _id: string
  isOnlyPartnership: boolean
  lastSurvey: SurveyModel|null
  observations: string|null
  experienceObservations: string|null
  documentType: string
  document: string
  name: string
  email: string
  mobileNumber: string
  phoneNumber: string
  annexed: string
  birthDate: string

  turnOfBusiness: string
  sourcesOfIncome: string,
  countrySource: string,
  amountUse: number
  countryOrigin: string
  districtOrigin: string
  provinceOrigin: string
  departmentOrigin: string
  addressOrigin: string
  countryResidence: string
  districtResidence: string
  provinceResidence: string
  departmentResidence: string
  addressResidence: string

  UIF: string
  hasComplianceOfficer: string
  managementManualLAFT: string
  codeEthicsConduct: string
  carryReviewClients: string
  madeMakeInvestments: string
  companyEverBeenInvestigated: string

  osceRegister: string
  osceHiring: string
  osceExpiration: string
  osceCertifiedDate: string
  osceObservation: string

  representativePosition: string
  representativeYearsOfService: string
  representativeCountryOrigin: string
  representativeCountryResidence: string

  representativeDistrictResidence: string
  representativeProvinceResidence: string
  representativeDepartmentResidence: string
  representativeAddressResidence: string
  representativeMobileNumber: string
  representativePhoneNumber: string

  representativeProfessionOccupation: string
  representativeEmail: string
  representativePEPInstitution: string
  representativePEPPositionn: string

  representativeDocumentType: string
  representativeDocument: number
  representativeName: string
  representativeNationality: string
  representativeMaritalStatus: string
  representativePropertyRegime: string
  representativeBirthDate: string
  representativeCrimeStatus: string
  representativeCrimeYear: number
  representativeCrime: string

  representativeSpouseDocumentType: string
  representativeSpouseDocument: string
  representativeSpouseName: string
  representativeSpouseNationality: string
  representativeSpouseMaritalStatus: string
  representativeSpousePropertyRegime: string
  representativeSpouseBirthDate: string

  createdAt: any
  updatedAt: any
  userId: string
  businessId: string
  salesMix: SalesMixModel[]
  mainSuppliers: MainSuppliersModel[]
  mainCustomers: MainCustomersModel[]
  accessCredit: AccessCreditModel[]
  accountRotation: AccountRotationModel[]
  trials: TrialsModel[]
  boardMembers: BoardMembersModel[]
  shareholders: ShareholderModel[]
  properties: PropertyModel[]
  movableProperties: MovablePropertyModel[]
  investments: InvestmentModel[]
  experiences: ExperienceModel[]
  guaranties: GuarantiesModel[]
  facilityCredits: FacilityCreditModel[]
  linkedBusinesses: BusinessModel[]
  worker: WorkerModel
}
