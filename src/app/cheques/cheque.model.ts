export interface Cheque {
  _id?: string,
  price: number,
  endDate: string,
  extension: Date|null,
  onModel: any,
  isPaid: boolean,
  guaranteeId: string,
  businessId: string,
}
