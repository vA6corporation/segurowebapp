import { WorkerModel } from "../workers/worker.model"

export interface NotificationModel {
  _id: string
  title: string
  message: string
  createdAt: string
  workerId: string
  worker: WorkerModel
}