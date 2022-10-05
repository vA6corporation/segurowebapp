import { BoardMembersModel } from '../board-members/board-members.model';
import { BoardMembersModule } from '../board-members/board-members.module';
import { ExperienceModel } from '../experiences/experience.model';
import { InvestmentModel } from '../investments/investment.model';
import { MovablePropertyModel } from '../movable-properties/movable-property.model';
import { PropertyModel } from '../properties/property.model';
import { ShareholderModel } from '../shareholders/shareholder.model';
import { GuarantiesModel } from './dialog-add-guaranties/guaranties.model';
import { FacilityCreditModel } from './facility-credit.model';

export interface BusinessModel {
  _id: string;
  documentType: string;
  document: string;
  name: string;
  email: string;
  mobileNumber: string;
  phoneNumber: string;
  annexed: string;
  birthDate: string;

  turnOfBusiness: string;
  countryOrigin: string;
  districtOrigin: string;
  provinceOrigin: string;
  departmentOrigin: string;
  addressOrigin: string;
  countryResidence: string;
  districtResidence: string;
  provinceResidence: string;
  departmentResidence: string;
  addressResidence: string;

  UIF: string;
  hasComplianceOfficer: string;
  managementManualLAFT: string;
  codeEthicsConduct: string;
  carryReviewClients: string;
  madeMakeInvestments: string;
  companyEverBeenInvestigated: string;

  osceRegister: string;
  osceHiring: string;
  osceExpiration: string;
  osceCertifiedDate: string;
  osceObservation: string;

  representativeName: string;
  representativePosition: string;
  representativeYearsOfService: string;
  representativeCountryOrigin: string;
  representativeCountryResidence: string;
  representativeProfessionOccupation: string;
  representativeEmail: string;
  representativePEPInstitution: string;
  representativePEPPositionn: string;
  representativeCriminalActivities: string;
  representativeCrimeStatus: string;
  representativeCrimeYear: string;
  representativeCrime: string;

  createdAt: any;
  updatedAt: any;
  userId: string;
  businessId: string;
  boardMembers: BoardMembersModel[];
  shareholders: ShareholderModel[];
  properties: PropertyModel[];
  movableProperties: MovablePropertyModel[];
  investments: InvestmentModel[];
  experiences: ExperienceModel[];
  guaranties: GuarantiesModel[];
  facilityCredits: FacilityCreditModel[];
  linkedBusinesses: BusinessModel[];
}
