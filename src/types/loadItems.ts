export type Sort = {
    key: string
    order: 'asc' | 'desc'
}

export interface LoadItemsInterface {
    page: number
    itemsPerPage: number
    sortBy: Sort[]
    groupBy?: string[]
    search?: string
}