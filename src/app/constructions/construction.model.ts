import { OfficeModel } from "../auth/office.model";
import { BeneficiaryModel } from "../beneficiaries/beneficiary.model";
import { BusinessModel } from "../businesses/business.model";
import { CompanyModel } from "../companies/company.model";
import { PartnershipModel } from "../partnerships/partnership.model";
import { UserModel } from "../users/user.model";
import { WorkerModel } from "../workers/worker.model";
import { PaymentModel } from "./payment.model";
import { PercentCompletionModel } from "./percent-completion.model";

export interface ConstructionModel {
  _id: string
  emitionAt: string
  code: string
  constructionCodeType: string
  processStatusCodeType: string
  percentageOfCompletion: number
  object: string
  commission: number
  businessId: string
  officeId: string
  user: UserModel
  worker: WorkerModel
  office: OfficeModel,
  partnership: PartnershipModel|null
  business: BusinessModel
  beneficiary: BeneficiaryModel
  company: CompanyModel
  percentCompletions: PercentCompletionModel[]
  percentCompletion: PercentCompletionModel|null
  payments: PaymentModel[]
  createdAt: string
  observations: string
  debt: number
}
