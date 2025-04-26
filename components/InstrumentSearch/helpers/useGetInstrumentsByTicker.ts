import { useCallback, useEffect, useState } from 'react'

interface GetInstrumentByTickerTypes {
  ticker: string
}

interface ChartMetaTypes {
  shortName: string
  regularMarketDayHigh: number
  regularMarketDayLow: number
  fullExchangeName: string
  currency: string
  symbol: string
  exchangeName: string
  instrumentType: string
  firstTradeDate: number
  regularMarketTime: number
  gmtoffset: number
  timezone: string
  exchangeTimezoneName: string
  regularMarketPrice: number
  chartPreviousClose: number
  priceHint: number
  currentTradingPeriod: {
    pre: {
      timezone: string
      start: number
      end: number
      gmtoffset: number
    }
    regular: {
      timezone: string
      start: number
      end: number
      gmtoffset: number
    }
    post: {
      timezone: string
      start: number
      end: number
      gmtoffset: number
    }
  }
  dataGranularity: string
  range: string
  validRanges: string[]
}

interface ChartIndicatorsTypes {
  quote: Array<{
    high: number[]
    open: number[]
    low: number[]
    close: number[]
    volume: number[]
  }>
  adjclose?: Array<{
    adjclose: number[]
  }>
}

interface ChartResultTypes {
  meta: ChartMetaTypes
  timestamp: number[]
  indicators: ChartIndicatorsTypes
}

interface ChartErrorTypes {
  code: string
  description: string
}

interface StockChartResponse {
  chart: {
    result: ChartResultTypes[]
    error: ChartErrorTypes | null
  }
}

const baseUrl = 'https://yfapi.net'
const apiKey = 'VmJTnhZRVx10CC40YEXyL3QBcmLlLJZS4WXuVSnC'

export function useGetInstrumentByTicker({
  ticker,
}: GetInstrumentByTickerTypes) {
  const [data, setData] = useState<StockChartResponse | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async (): Promise<StockChartResponse> => {
    setData(undefined)
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${baseUrl}/v8/finance/chart/${ticker}`, {
        headers: { 'X-API-KEY': apiKey },
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      const result = await response.json() as StockChartResponse
      setData(result)
      return result
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Unknown error')
      setError(errorObj)
      throw errorObj
    } finally {
      setLoading(false)
    }
  }, [ticker])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}