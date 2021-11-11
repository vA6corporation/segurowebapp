import { Beneficiary } from "../beneficiaries/beneficiary.model";
import { Cheque } from "../cheques/cheque.model";
import { Customer } from "../customers/customer.model";
import { Deposit } from "../deposits/deposit.model";
import { Financier } from "../financiers/financier.model";
import { Partnership } from "../partnerships/partnership.model";

export interface Compliance {
  _id?: string,
  price: number,
  startDate: Date,
  endDate: Date,
  policyNumber: string,
  object: string,
  guarantee: number,
  customerId: string,
  financierId: string,
  customer?: Customer,
  financier?: Financier,
  beneficiary?: Beneficiary,
  partnership?: Partnership,
  guaranteeType?: string,
  isMarked?: boolean,
  cheques?: Cheque[],
  deposits?: Deposit[],
  createdAt: any,
  updatedAt: any,
  userId: string,
  businessId: string,
}
