export interface CustomerNodeModel {
    _id: string
    isTop: boolean
    expandable: boolean
    name: string
    contentType: string | null
    level: number
    // fileId: string | null
    customerNodeId: string | null
    customerId: string
}