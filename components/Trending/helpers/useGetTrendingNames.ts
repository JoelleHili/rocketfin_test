import { useCallback, useEffect, useState } from 'react'

interface getTrendingNamesTypes {
  trendingList: Array<string>
}

interface TrendingNamesResponse {
  quoteResponse: {
    result: Array<{
      symbol: string
      displayName: string
    }>
    error: Record<string, any> | null
  }
}

const baseUrl = "https://yfapi.net"
const apiKey = 'VmJTnhZRVx10CC40YEXyL3QBcmLlLJZS4WXuVSnC'

export function useGetTrendingNames({ trendingList }: getTrendingNamesTypes) {
  const [data, setData]       = useState<TrendingNamesResponse>()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<Error | null>(null)

  const fetchData = useCallback(async (): Promise<TrendingNamesResponse> => {
    setData(undefined)
    setLoading(true)
    setError(null)

    try {
      console.log("Trending to Get Names of:", trendingList)
      const response = await fetch(`${baseUrl}v6/finance/quote?region=US&lang=en&symbols=${trendingList.toString()}`, {
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
  }, [trendingList])

  useEffect(() => {
      fetchData()
    }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
