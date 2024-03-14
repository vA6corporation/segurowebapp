export interface CreateOperationNodeModel {
    _id: string,
    name: string
    contentType: string | null
    operationId: string
    operationNodeId: string | null
}