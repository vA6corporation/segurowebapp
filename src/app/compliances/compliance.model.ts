import { Beneficiary } from "../beneficiaries/beneficiary.model";
import { Customer } from "../customers/customer.model";
import { Financier } from "../financiers/financier.model";
import { Partnership } from "../partnerships/partnership.model";

export interface Compliance {
  _id?: string,
  price: number,
  startDate: Date,
  endDate: Date,
  customerId: string,
  financierId: string,
  customer?: Customer,
  financier?: Financier,
  beneficiary?: Beneficiary,
  partnership?: Partnership,
  createdAt: any,
  updatedAt: any,
  userId: string,
  businessId: string,
}
