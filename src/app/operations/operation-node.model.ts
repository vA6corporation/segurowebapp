export interface OperationNodeModel {
  _id: string
  isTop: boolean
  expandable: boolean
  name: string
  contentType: string|null
  level: number
  // childrens?: OperationNodeModel[]
  fileId: string|null
  operationNodeId: string|null
  operationId: string
}