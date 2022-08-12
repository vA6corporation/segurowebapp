import { OfficeModel } from "../auth/office.model";
import { BeneficiaryModel } from "../beneficiaries/beneficiary.model";
import { CustomerModel } from "../customers/customer.model";
import { PartnershipModel } from "../partnerships/partnership.model";
import { UserModel } from "../users/user.model";
import { WorkerModel } from "../workers/worker.model";

export interface ConstructionModel {
  _id: string
  emitionAt: string,
  code: string,
  object: string
  user: UserModel|null
  worker: WorkerModel|null
  office: OfficeModel,
  partnership: PartnershipModel|null
  customer: CustomerModel
  beneficiary: BeneficiaryModel
  createdAt: string
}
