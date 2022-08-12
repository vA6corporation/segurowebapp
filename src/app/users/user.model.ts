
export interface UserModel {
  _id: string,
  name: string,
  email: string,
  password: string,
  isAdmin: boolean
  workerId?: string,
  businessId?: string,
  createdAt?: any,
  updatedAt?: any,
  privileges?: any
}
