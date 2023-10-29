import { WorkerModel } from "../workers/worker.model"

export enum SeaceDataTypes {
  SINGESTION = '01',
  ENGESTION = '02',
  GESTIONADO = '03',
  OBSERVADO = '04',
  NOHABIDO = '05',
  CERRADO = '06'
}

export interface SeaceDataModel {
  _id: string
  isNotify: number
  statusCode: SeaceDataTypes
  status: string
  bidder: string
  convocatoriaDate: string|null
  buenaProDate: string
  adjudicadoDate: string|null
  momenclatura: string
  objetoContratacion: string
  estado: string
  valorReferencial: string
  observations: string
  workerId: string|null
  worker: WorkerModel|null
}