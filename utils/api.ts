type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiOptions<TRequestBody = unknown> {
  method?: ApiMethod;
  body?: TRequestBody;
  headers?: Record<string, string>;
}

export async function fetchApi<TResponseData, TRequestBody = unknown>(
  endpoint: string, 
  options: ApiOptions<TRequestBody> = {}
): Promise<TResponseData> {
  const { method = 'GET', body, headers = {} } = options;
  
  const requestOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  
  if (body !== undefined) {
    requestOptions.body = JSON.stringify(body);
  }
  
  const response = await fetch(`/api/${endpoint}`, requestOptions);
  
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `API error: ${response.status}`);
    } catch {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
  }
  
  return response.json() as Promise<TResponseData>;
}