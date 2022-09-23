import { BusinessModel } from "../businesses/business.model"
import { FinancierModel } from "../financiers/financier.model"
import { PartnershipModel } from "../partnerships/partnership.model"
import { WorkerModel } from "../workers/worker.model"

export interface CreditModel {
    _id: string
    emitionAt: string
    expirationAt: string
    prima: number
    days: number
    commission: number
    charge: string
    financierId: string
    businessId: string
    brokerId: string
    workerId: string
    partnership?: PartnershipModel
    financier: FinancierModel
    business: BusinessModel
    worker: WorkerModel
}