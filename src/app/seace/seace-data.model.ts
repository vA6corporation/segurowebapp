import { WorkerModel } from "../workers/worker.model"

export interface SeaceDataModel {
  _id: string
  convocatoriaDate: string|null
  buenaProDate: string
  momenclatura: string
  objetoContratacion: string
  estado: string
  valorReferencial: string
  observations: string
  workerId: string|null
  worker: WorkerModel|null
}