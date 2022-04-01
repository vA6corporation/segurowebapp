import { Guarantee } from "../reports/guarantee.interface";

export interface Cheque {
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
  guarantee: Guarantee|null
  businessId: string
}
