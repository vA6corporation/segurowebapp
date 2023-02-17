import { CompanyModel } from "../companies/company.model";
import { BankModel } from "../providers/bank.model";
import { ProviderBankModel } from "../providers/provider-bank";
import { ProviderModel } from "../providers/provider.model";
import { PaymentOrderPdfModel } from "./payment-order-pdf.model";

export interface PaymentOrderModel {
  _id: string
  provider: ProviderModel
  company: CompanyModel
  bank: BankModel
  providerBank: ProviderBankModel
  concept: string
  charge: number
  observations: string
  paymentAt: string
  createdAt: string
  providerId: string
  attachments: PaymentOrderPdfModel[]
}