import { BeneficiaryModel } from "../beneficiaries/beneficiary.model";
import { BrokerModel } from "../brokers/broker.model";
import { BusinessModel } from "../businesses/business.model";
import { ChequeModel } from "../cheques/cheque.model";
import { ConstructionModel } from "../constructions/construction.model";
import { DepositModel } from "../deposits/deposit.model";
import { FinancierModel } from "../financiers/financier.model";
import { PartnershipModel } from "../partnerships/partnership.model";
import { PaymentModel } from "../payments/payment.model";
import { WorkerModel } from "../workers/worker.model";

export interface DirectModel {
    _id: string
    status: string
    statusLabel: string
    prima: number
    price: number
    startDate: string
    endDate: string
    guarantee: number
    object: string
    diffDays: number
    policyNumber: string
    businessId: string
    financierId: string
    beneficiaryId: string
    business: BusinessModel
    financier: FinancierModel
    broker: BrokerModel
    beneficiary: BeneficiaryModel
    partnership: PartnershipModel
    construction: ConstructionModel
    worker: WorkerModel | null
    guaranteeType: string
    isMarked: boolean
    cheques: ChequeModel[]
    deposits: DepositModel[]
    payments: PaymentModel[]
    createdAt: any
    updatedAt: any
    observations: string
    renewObservations: string
    userId: string
}
