import { OfficeModel } from "../auth/office.model";

export interface WorkerModel {
  _id: string
  name: string
  documentType: string
  document: string
  address: string
  mobileNumber: string
  email: string
  birthDate: string
  office: OfficeModel
  showTiming: boolean
}