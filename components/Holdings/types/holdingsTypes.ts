export interface HoldingsTypes{
    symbol: string
    shortName: string
    ask: number
}

export interface HoldingsListTypes{
    list: Array<HoldingsTypes>
}

export interface HoldingsMessageTypes{
    message: string
}