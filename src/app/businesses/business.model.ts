import { ExperienceModel } from "../experiences/experience.model"
import { InvestmentModel } from "../investments/investment.model"
import { MovablePropertyModel } from "../movable-properties/movable-property.model"
import { PropertyModel } from "../properties/property.model"
import { ShareholderModel } from "../shareholders/shareholder.model"
import { FacilityCreditModel } from "./facility-credit.model"

export interface BusinessModel {
  _id: string
  documentType: string
  document: string
  name: string
  email: string
  mobileNumber: string
  phoneNumber: string
  annexed: string
  birthDate: string
  address: string
  representativeName: string
  createdAt: any
  updatedAt: any
  userId: string
  businessId: string
  shareholders: ShareholderModel[]
  properties: PropertyModel[]
  movableProperties: MovablePropertyModel[]
  investments: InvestmentModel[]
  experiences: ExperienceModel[]
  facilityCredits: FacilityCreditModel[]
}
