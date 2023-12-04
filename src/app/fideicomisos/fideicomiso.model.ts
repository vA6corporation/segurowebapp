import { CustomerModel } from "../customers/customer.model"
import { FinancierModel } from "../financiers/financier.model"
import { PaymentModel } from "../payments/payment.model"
import { WorkerModel } from "../workers/worker.model"

export interface FideicomisoModel {
  _id: string 
  emitionAt: string
  expirationAt: string
  days: number
  commission: number|null
  charge: string
  financierId: string
  customerId: string
  workerId: string
  createdAt: string
  payments: PaymentModel[]
  financier: FinancierModel
  customer: CustomerModel
  worker: WorkerModel
}