import { BusinessModel } from "../businesses/business.model";
import { PartnershipItemModel } from "./partnership-item.model";

export interface PartnershipModel {
  _id: string
  document: string
  name: string
  email: string
  phoneNumber: string
  annexed: string
  representative: string
  representativeDocument: string
  business: BusinessModel
  partnershipItems: PartnershipItemModel[]
  businessId: string
  createdAt: any
  updatedAt: any
  userId: string
}
