import { useCallback, useEffect, useState } from 'react'

interface getInstrumentByTickerTypes {
  ticker: string
}

interface StockChartResponse {
  chart: {
    result: Array<{
      meta: Record<string, any>
      timestamp: number[]
      indicators: Record<string, any>
    }>
    error: Record<string, any> | null
  }
}

const baseUrl = 'https://yfapi.net'
const apiKey = 'VmJTnhZRVx10CC40YEXyL3QBcmLlLJZS4WXuVSnC'

export function useGetInstrumentByTicker({
  ticker,
}: getInstrumentByTickerTypes) {
  const [data, setData] = useState<StockChartResponse>()
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
      const result = await response.json()
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
