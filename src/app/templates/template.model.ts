import { BeneficiaryModel } from "../beneficiaries/beneficiary.model";
import { BusinessModel } from "../businesses/business.model";
import { PartnershipModel } from "../partnerships/partnership.model";

export interface TemplateModel {
  _id: string
  businessId: string
  partnershipId: string
  business: BusinessModel
  partnership: PartnershipModel|null
  beneficiary: BeneficiaryModel
}