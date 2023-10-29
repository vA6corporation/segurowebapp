export interface DeviceModel {
  _id: string
  deviceId: string
  name: string
  userId: string
  isActive: boolean
}

export interface UserModel {
  _id: string
  name: string
  email: string
  password: string
  assignedOfficeId: string
  showAllNotifications: boolean
  allowChangeWorkerOnBusiness: boolean
  allowChangeConstructionCode: boolean
  isAdmin: boolean
  workerId?: string
  businessId?: string
  createdAt?: any
  updatedAt?: any
  privileges?: any
  worker?: any
  devices: DeviceModel[]
}
