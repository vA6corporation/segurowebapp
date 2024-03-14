import { BusinessModel } from "../businesses/business.model";

export interface InsurancePartnershipModel {
    _id?: string,
    document: string,
    name: string,
    email: string,
    phoneNumber: string,
    annexed: string,
    representative: string,
    representativeDocument: string,
    business: BusinessModel,
    createdAt: any,
    updatedAt: any,
    userId: string,
    businessId: string,
}
