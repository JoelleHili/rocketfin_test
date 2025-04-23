import { Dispatch, SetStateAction } from "react"

export interface InstrumentSearchResultTypes {
    instrumentType: string
    shortName: string
    regularMarketPrice: number
    regularMarketDayHigh: number
    regularMarketDayLow: number
    fullExchangeName: string
}

export interface InstrumentSearchResultEmptyTypes{
    message: string
}

export interface InstrumentSearchBarTypes {
    value: string
    setValue: Dispatch<SetStateAction<string>>
}