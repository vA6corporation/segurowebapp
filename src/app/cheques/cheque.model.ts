import { GuaranteeModel } from "../guarantees/guarantee.model"

export interface ChequeModel {
  _id: string
  price: number
  paymentType: string
  observations: string
  paymentAt: string
  extensionAt: string|null
  deletedAt: string|null
  onModel: any
  currency: string
  isPaid: boolean
  guaranteeId: string
  guarantee: GuaranteeModel
  businessId: string
}
