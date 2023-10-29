import { BusinessModel } from "../businesses/business.model"
import { PartnershipModel } from "../partnerships/partnership.model"

export interface OperationModel {
  name: string
  partnership: PartnershipModel|null
  business: BusinessModel
  businessId: string
  partnershipId: string
}