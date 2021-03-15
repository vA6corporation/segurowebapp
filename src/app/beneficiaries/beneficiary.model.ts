import { Partnership } from "../partnerships/partnership.model";

export interface Beneficiary {
  _id?: string,
  document: string,
  name: string,
  email: string,
  phoneNumber: string,
  annexed: string,
  createdAt: any,
  updatedAt: any,
  partnershipId: string,
  partnership?: Partnership
  userId: string,
  businessId: string,
}
