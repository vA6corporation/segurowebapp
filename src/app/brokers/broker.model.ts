import { BusinessModel } from "../businesses/business.model"
import { FinancierModel } from "../financiers/financier.model"

export interface BrokerModel {
    _id: string
    documentType: string
    document: string
    name: string
    email: string
    mobileNumber: string
    phoneNumber: string

    broker: BrokerModel
    financier: FinancierModel
    business: BusinessModel
}