export interface TransactionHistoryTypes{
    symbol: string
    shortName: string
    type: "Bought" | "Sold"
    amount: number
}

export interface TransactionHistoryListTypes{
    list: Array<TransactionHistoryTypes>
}