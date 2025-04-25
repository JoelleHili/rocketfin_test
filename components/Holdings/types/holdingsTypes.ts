export interface HoldingsTypes{
    symbol: string
    shortName: string
    amount: number
}

export interface HoldingsListTypes{
    list: Array<HoldingsTypes>
}

export interface HoldingsMessageTypes{
    message: string
}