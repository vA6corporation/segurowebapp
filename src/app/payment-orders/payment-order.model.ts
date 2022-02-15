import { Provider } from "@angular/core";

export interface PaymentOrderModel {
  _id: string
  provider: Provider
  concept: string
  charge: number
  observations: string
  paymentAt: string
  createdAt: string
  bank: string
  providerId: string
  pdfId: string|null
}