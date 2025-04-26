import { useCallback, useEffect, useState } from 'react'

interface GetTrendingByRegionTypes {
  region: string
}

interface TrendingQuoteTypes {
  symbol: string
  shortName: string
  longName?: string
  exchange: string
  market: string
  quoteType: string
  score: number
  typeDisp: string
  isYahooFinance: boolean
}

interface TrendingResultTypes {
  count: number
  jobTimestamp: number
  quotes: TrendingQuoteTypes[]
  startInterval: number
}

interface TrendingErrorTypes {
  code: string
  description: string
}

interface TrendingListResponseTypes {
  finance: {
    result: TrendingResultTypes[]
    error: TrendingErrorTypes | null
  }
}

const baseUrl = 'https://yfapi.net'
const apiKey = 'VmJTnhZRVx10CC40YEXyL3QBcmLlLJZS4WXuVSnC'

export function useGetTrendingByRegion({ region }: GetTrendingByRegionTypes) {
  const [data, setData] = useState<TrendingListResponseTypes | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async (): Promise<TrendingListResponseTypes> => {
    setData(undefined)
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${baseUrl}/v1/finance/trending/${region}`, {
        headers: { 'X-API-KEY': apiKey },
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      const result = await response.json() as TrendingListResponseTypes
      setData(result)
      return result
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Unknown error')
      setError(errorObj)
      throw errorObj
    } finally {
      setLoading(false)
    }
  }, [region])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}