import { CertifierModel } from "../certifiers/certifier.model"
import { CustomerModel } from "../customers/customer.model"
import { PaymentModel } from "../payments/payment.model"
import { BankModel } from "../providers/bank.model"
import { WorkerModel } from "../workers/worker.model"

export interface IsoModel {
  _id: string 
  types: Array<string>
  emitionAt: string
  expirationAt: string
  commission: number|null
  charge: string
  brokerId: string

  customerId: string
  certifierId: string
  createdAt: string
  payments: PaymentModel[]
  customer: CustomerModel
  certifier: CertifierModel
  worker: WorkerModel
  bank: BankModel
}