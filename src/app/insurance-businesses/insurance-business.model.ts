import { ShareholderModel } from "../shareholders/shareholder.model"

export interface InsuranceBusinessModel {
  _id: string
  documentType: string
  document: string
  name: string
  email: string
  mobileNumber: string
  phoneNumber: string
  annexed: string
  birthDate: string
  address: string
  representativeName: string
  createdAt: any
  updatedAt: any
  userId: string
  businessId: string
  shareholders: ShareholderModel[]
}
