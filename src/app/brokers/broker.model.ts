import { CustomerModel } from "../customers/customer.model"
import { FinancierModel } from "../financiers/financier.model"

export interface BrokerModel {
    _id?: string
    typeDocument: string
    document: string
    name: string
    email: string
    mobileNumber: string
    phoneNumber: string

    broker: BrokerModel
    financier: FinancierModel
    customer: CustomerModel
}