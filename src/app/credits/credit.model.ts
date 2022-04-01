import { BrokerModel } from "../brokers/broker.model"
import { CustomerModel } from "../customers/customer.model"
import { FinancierModel } from "../financiers/financier.model"
import { PartnershipModel } from "../partnerships/partnership.model"
export interface CreditModel {
    _id: string
    emitionAt: string
    expirationAt: string
    prima: number
    commission: number
    charge: string
    financierId: string
    customerId: string
    brokerId: string
    workerId: string
    partnership?: PartnershipModel
    financier?: FinancierModel
    customer?: CustomerModel
}