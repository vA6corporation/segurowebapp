import { BusinessModel } from "../businesses/business.model"
import { CompanyModel } from "../companies/company.model"
import { FinancierModel } from "../financiers/financier.model"
import { PartnershipModel } from "../partnerships/partnership.model"
import { BankModel } from "../providers/bank.model"
import { WorkerModel } from "../workers/worker.model"

export interface FideicomisoModel {
  _id: string 
  emitionAt: string
  expirationAt: string
  prima: number
  days: number
  commission: number|null
  charge: string
  financierId: string
  businessId: string
  brokerId: string
  workerId: string
  createdAt: string
  partnership?: PartnershipModel
  financier: FinancierModel
  business: BusinessModel
  worker: WorkerModel
  company: CompanyModel
  bank: BankModel
}