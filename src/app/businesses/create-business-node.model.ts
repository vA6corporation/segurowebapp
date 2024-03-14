export interface CreateBusinessNodeModel {
    _id: string,
    name: string
    type: string
    contentType: string | null
    businessId: string
    businessNodeId: string | null
}