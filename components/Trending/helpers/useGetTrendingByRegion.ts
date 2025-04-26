import { useCallback, useEffect, useState } from 'react'

interface getTrendingByRegionTypes {
  region: string
}

interface TrendingListResponse {
  finance: {
    result: Array<{
      count: number
      jobTimestamp: number
      quotes: Record<string, any>
      startInterval: number
    }>
    error: Record<string, any> | null
  }
}

const baseUrl = 'https://yfapi.net'
const apiKey = 'VmJTnhZRVx10CC40YEXyL3QBcmLlLJZS4WXuVSnC'

export function useGetTrendingByRegion({ region }: getTrendingByRegionTypes) {
  const [data, setData] = useState<TrendingListResponse>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async (): Promise<TrendingListResponse> => {
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
  }, [region])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
