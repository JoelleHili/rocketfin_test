import { useState, useEffect } from 'react'

interface getInstrumentByTickerTypes {
  ticker: string
  autoFetch?: boolean
}

interface StockChartResponse {
  chart: {
    result: Array<{
      meta: Record<string, any>
      timestamp: number[]
      indicators: Record<string, any>
    }>
    error: string | null
  }
}

const baseUrl = "https://yfapi.net"
const apiKey = 'VmJTnhZRVx10CC40YEXyL3QBcmLlLJZS4WXuVSnC'

export function useGetInstrumentByTicker({
  ticker,
  autoFetch = true,
}: getInstrumentByTickerTypes) {
  const [data, setData] = useState<StockChartResponse | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(autoFetch)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async (): Promise<StockChartResponse> => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        `${baseUrl}/v8/finance/chart/${ticker}`,
        {
          headers: {
            'X-API-KEY': apiKey,
          },
        }
      )

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
      return result
    } catch (err) {
      const errorObj =
        err instanceof Error ? err : new Error('An unknown error occurred')
      setError(errorObj)
      throw errorObj
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (autoFetch) {
      fetchData().catch(console.error)
    }
  }, [ticker])

  return { data, loading, error, refetch: fetchData }
}
