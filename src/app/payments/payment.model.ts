import { CompanyModel } from "../companies/company.model"
import { BankModel } from "../providers/bank.model"

export interface PaymentModel {
  charge: number
  paymentAt: string
  bankId: string
  type: string
  onModel: string
  companyId: string
  bank: BankModel
  company: CompanyModel
}