import { BusinessModel } from "../businesses/business.model"
import { ConstructionModel } from "../constructions/construction.model"
import { FinancierModel } from "../financiers/financier.model"
import { PartnershipModel } from "../partnerships/partnership.model"

export interface GuaranteeModel {
  _id: string
  businessId: string
  guaranteeType: string
  status: string
  policyNumber: string
  isPaid: boolean
  price: number
  prima: number
  processStatus: string
  statusLabel: string
  endDate: string
  observations: string
  financier: FinancierModel
  business: BusinessModel
  partnership: PartnershipModel
  construction: ConstructionModel
}