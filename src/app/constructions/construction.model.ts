import { CustomerModel } from "../customers/customer.model";
import { PartnershipModel } from "../partnerships/partnership.model";
import { UserModel } from "../users/user.model";

export interface ConstructionModel {
  _id: string,
  object: string,
  user: UserModel|null,
  partnership: PartnershipModel|null,
  customer: CustomerModel
}
