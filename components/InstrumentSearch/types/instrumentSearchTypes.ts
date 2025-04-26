import { Dispatch, SetStateAction } from 'react'

export interface InstrumentSearchResultTypes {
  instrumentType: string
  shortName: string
  regularMarketPrice: number
  regularMarketDayHigh: number
  regularMarketDayLow: number
  fullExchangeName: string
  currentholdings: number
  buy: React.ReactNode
  sell: React.ReactNode
}

export interface InstrumentSearchResultEmptyTypes {
  message: string
}

export interface InstrumentSearchBarTypes {
  value: string
  setValue: Dispatch<SetStateAction<string>>
}
