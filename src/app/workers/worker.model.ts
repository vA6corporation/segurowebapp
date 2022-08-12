import { OfficeModel } from "../auth/office.model";

export interface WorkerModel {
  _id: string,
  name: string,
  identificationType: string,
  identificationNumber: string,
  address: string,
  mobileNumber: string,
  email: string,
  birthDate: string,
  office: OfficeModel
}