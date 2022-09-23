import { BeneficiaryModel } from "../beneficiaries/beneficiary.model";
import { BusinessModel } from "../businesses/business.model";
import { ChequeModel } from "../cheques/cheque.model";
import { ConstructionModel } from "../constructions/construction.model";
import { DepositModel } from "../deposits/deposit.model";
import { FinancierModel } from "../financiers/financier.model";
import { PartnershipModel } from "../partnerships/partnership.model";
import { WorkerModel } from "../workers/worker.model";

export interface ComplianceModel {
  _id: string,
  price: number,
  startDate: Date,
  endDate: Date,
  policyNumber: string,
  object: string,
  guarantee: number,
  businessId: string,
  financierId: string,
  business: BusinessModel,
  financier: FinancierModel,
  beneficiary: BeneficiaryModel,
  partnership: PartnershipModel|null,
  construction: ConstructionModel,
  worker: WorkerModel,
  guaranteeType: string,
  isMarked: boolean,
  cheques: ChequeModel[],
  deposits: DepositModel[],
  createdAt: any,
  updatedAt: any,
  userId: string,
}
