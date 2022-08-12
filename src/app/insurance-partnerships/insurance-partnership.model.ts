import { CustomerModel } from "../customers/customer.model";

export interface InsurancePartnershipModel {
  _id?: string,
  document: string,
  name: string,
  email: string,
  phoneNumber: string,
  annexed: string,
  representative: string,
  representativeDocument: string,
  customer?: CustomerModel,
  createdAt: any,
  updatedAt: any,
  userId: string,
  businessId: string,
}
