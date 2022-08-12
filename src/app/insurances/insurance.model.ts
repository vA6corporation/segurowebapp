import { BrokerModel } from "../brokers/broker.model"
import { ConstructionModel } from "../constructions/construction.model"
import { CustomerModel } from "../customers/customer.model"
import { FinancierModel } from "../financiers/financier.model"
import { InsurancePartnershipModel } from "../insurance-partnerships/insurance-partnership.model"
import { WorkerModel } from "../workers/worker.model"
export interface InsuranceModel {
    _id: string
    emitionAt: string
    type: string
    insuranceNumber: string
    policyNumber: string
    prima: number
    commission: number
    expirationAt: string
    isPaid: boolean
    financierId: string
    customerId: string
    brokerId: string
    workerId: string
    partnership?: InsurancePartnershipModel
    construction?: ConstructionModel
    broker?: BrokerModel
    financier?: FinancierModel
    customer?: CustomerModel
    worker?: WorkerModel
}