import { OfficeModel } from "../auth/office.model";
import { BeneficiaryModel } from "../beneficiaries/beneficiary.model";
import { BusinessModel } from "../businesses/business.model";
import { PartnershipModel } from "../partnerships/partnership.model";
import { UserModel } from "../users/user.model";
import { WorkerModel } from "../workers/worker.model";

export interface ConstructionModel {
  _id: string
  emitionAt: string
  code: string
  constructionCodeType: string
  percentageOfCompletion: number
  object: string
  businessId: string
  user: UserModel
  worker: WorkerModel
  office: OfficeModel,
  partnership: PartnershipModel|null
  business: BusinessModel
  beneficiary: BeneficiaryModel
  createdAt: string
}
