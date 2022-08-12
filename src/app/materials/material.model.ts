import { BeneficiaryModel } from "../beneficiaries/beneficiary.model";
import { Cheque } from "../cheques/cheque.model";
import { ConstructionModel } from "../constructions/construction.model";
import { CustomerModel } from "../customers/customer.model";
import { Deposit } from "../deposits/deposit.model";
import { FinancierModel } from "../financiers/financier.model";
import { PartnershipModel } from "../partnerships/partnership.model";
import { WorkerModel } from "../workers/worker.model";

export interface Material {
  _id?: string,
  price: number,
  advance: number,
  policyNumber: string,
  object: string,
  guarantee: number,
  startDate: string,
  endDate: string,
  customerId: string,
  financierId: string,
  customer?: CustomerModel,
  financier?: FinancierModel,
  beneficiary?: BeneficiaryModel,
  partnership?: PartnershipModel,
  construction: ConstructionModel|null;
  worker: WorkerModel|null,
  guaranteeType?: string,
  isMarked?: boolean,
  cheques?: Cheque[],
  deposits?: Deposit[],
  createdAt: any,
  updatedAt: any,
  userId: string,
  businessId: string,
}
