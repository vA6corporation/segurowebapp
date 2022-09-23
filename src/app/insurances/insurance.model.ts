import { BrokerModel } from "../brokers/broker.model"
import { BusinessModel } from "../businesses/business.model"
import { ConstructionModel } from "../constructions/construction.model"
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
    businessId: string
    brokerId: string
    workerId: string
    partnership: InsurancePartnershipModel
    construction: ConstructionModel
    broker: BrokerModel
    financier: FinancierModel
    business: BusinessModel
    worker: WorkerModel
}