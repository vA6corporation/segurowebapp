import { Provider } from "@angular/core";
import { PaymentOrderPdfModel } from "./payment-order-pdf.model";

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
  attachments: PaymentOrderPdfModel[]
}