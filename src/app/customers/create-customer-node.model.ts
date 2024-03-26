export interface CreateCustomerNodeModel {
    _id: string,
    name: string
    type: string
    contentType: string | null
    customerId: string
    customerNodeId: string | null
}