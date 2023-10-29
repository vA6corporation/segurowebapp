import { GuaranteeModel } from "../guaranties/guarantee.model"

export interface ChequeModel {
  _id: string
  price: number
  paymentType: string
  observations: string
  paymentAt: string
  extensionAt: string|null
  deletedAt: string|null
  onModel: any
  currencyCode: string
  isPaid: boolean
  guaranteeId: string
  guarantee: GuaranteeModel
  businessId: string
}
