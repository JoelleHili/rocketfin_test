import { useState, useEffect } from 'react';
import { fetchApi } from '@utils/api';

interface UseApiOptions<TResponseData, TRequestBody = unknown> {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: TRequestBody;
  initialData?: TResponseData;
  autoFetch?: boolean;
}

interface UseApiResult<TResponseData> {
  data: TResponseData | undefined;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<TResponseData>;
}

export function useApi<TResponseData, TRequestBody = unknown>({
  endpoint,
  method = 'GET',
  body,
  initialData,
  autoFetch = true,
}: UseApiOptions<TResponseData, TRequestBody>): UseApiResult<TResponseData> {
  const [data, setData] = useState<TResponseData | undefined>(initialData);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (): Promise<TResponseData> => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchApi<TResponseData, TRequestBody>(endpoint, { method, body });
      setData(result);
      return result;
    } catch (err) {
      const errorObject = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(errorObject);
      throw errorObject;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData().catch((err) => {
        console.error('Error fetching data:', err);
      });
    }
  }, [endpoint]); // Re-fetch if endpoint changes

  return { data, loading, error, refetch: fetchData };
}