import { OperationNodeModel } from "./operation-node.model"

export interface CreateOperationNodeModel {
  // _id: string
  name: string
  operationId: string
  operationNodeId: string|null
  // isTop: boolean
  // expandable: boolean
  // contentType: string
  // fileId: string
  // level: number
  childrens?: OperationNodeModel[]
}