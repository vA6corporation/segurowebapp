export interface BusinessNodeModel {
    _id: string
    isTop: boolean
    expandable: boolean
    name: string
    contentType: string | null
    level: number
    // fileId: string | null
    businessNodeId: string | null
    businessId: string
}