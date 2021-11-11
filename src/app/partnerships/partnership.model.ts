import { Customer } from "../customers/customer.model";

export interface Partnership {
  _id?: string,
  document: string,
  name: string,
  email: string,
  phoneNumber: string,
  annexed: string,
  representative: string,
  representativeDocument: string,
  customer?: Customer,
  createdAt: any,
  updatedAt: any,
  userId: string,
  businessId: string,
}
