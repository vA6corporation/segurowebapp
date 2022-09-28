import { InvestmentModel } from "../investments/investment.model"
import { MovablePropertyModel } from "../movable-properties/movable-property.model"
import { PropertyModel } from "../properties/property.model"
import { IncomeModel } from "./income.model"

export interface ShareholderModel {
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
  createdAt: any
  updatedAt: any
  userId: string
  businessId: string
  properties: PropertyModel[]
  movableProperties: MovablePropertyModel[]
  incomes: IncomeModel[]
  investments: InvestmentModel[]
}
