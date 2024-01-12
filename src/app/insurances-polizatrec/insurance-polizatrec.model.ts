import { BrokerModel } from "../brokers/broker.model"
import { BusinessModel } from "../businesses/business.model"
import { ConstructionModel } from "../constructions/construction.model"
import { FinancierModel } from "../financiers/financier.model"
import { InsurancePartnershipModel } from "../insurance-partnerships/insurance-partnership.model"
import { PaymentModel } from "../payments/payment.model"
import { WorkerModel } from "../workers/worker.model"

export interface InsurancePolizatrecModel {
    _id: string
    emitionAt: string
    type: string
    insuranceNumber: string
    insuranceGroupId: string
    policyNumber: string
    prima: number
    commission: number
    expirationAt: string
    isPaid: boolean
    financierId: string
    businessId: string
    brokerId: string
    bankId: string
    companyId: string
    workerId: string
    observations: string
    partnership: InsurancePartnershipModel|null
    construction: ConstructionModel
    payments: PaymentModel[]
    broker: BrokerModel
    financier: FinancierModel
    business: BusinessModel
    worker: WorkerModel
    createdAt: string
}