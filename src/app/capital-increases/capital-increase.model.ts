import { CustomerModel } from "../customers/customer.model"
import { PaymentModel } from "../payments/payment.model"
import { BankModel } from "../providers/bank.model"
import { WorkerModel } from "../workers/worker.model"

export interface CapitalIncreaseModel {
  _id: string 
  emitionAt: string
  expirationAt: string
  capital: number
  commission: number|null
  charge: string
  brokerId: string

  customerId: string
  createdAt: string
  payments: PaymentModel[]
  customer: CustomerModel
  worker: WorkerModel
  bank: BankModel
}