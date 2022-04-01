import { BrokerModel } from "../brokers/broker.model"
import { CustomerModel } from "../customers/customer.model"
import { FinancierModel } from "../financiers/financier.model"
export interface InsuranceModel {
    _id: string
    emitionAt: string
    type: string
    policyNumber: string
    prima: number
    commission: number
    expirationAt: string
    isPaid: boolean
    financierId: string
    customerId: string
    brokerId: string
    workerId: string
    broker?: BrokerModel
    financier?: FinancierModel
    customer?: CustomerModel
}