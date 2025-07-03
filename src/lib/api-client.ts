// api-client.ts - A robust API client for Next.js server components

import { cache } from 'react'
import henv from '@/lib/henv'

const getDefaultHeaders = cache(() => ({}) as Record<string, string>)
const getBaseUrl = cache(() => ({ value: '' }))

/**
 * Configuration options for API requests
 */
export interface RequestOptions extends RequestInit {
  /** Request timeout in milliseconds (default: 30000ms) */
  timeout?: number
  /** Base URL to prepend to the endpoint */
  baseUrl?: string
  /** Query parameters to append to the URL */
  params?: Record<string, string | number | boolean | undefined | null>
  /** Additional headers to include with the request */
  headers?: Record<string, string>
  /** Default headers to apply to every request (can be overridden) */
  defaultHeaders?: Record<string, string>
  /** Whether to log this request (default: true) */
  logging?: boolean
  /** Threshold in ms to consider a request "slow" for logging purposes (default: 1000ms) */
  slowThreshold?: number
}

/**
 * Error class for API requests
 */
export class ApiError extends Error {
  status: number
  statusText: string
  url: string
  body: any

  constructor(response: Response, body?: any) {
    super(`API Error: ${response.status} ${response.statusText}`)
    this.name = 'ApiError'
    this.status = response.status
    this.statusText = response.statusText
    this.url = response.url
    this.body = body
  }
}

/**
 * Error class for request timeouts
 */
export class TimeoutError extends Error {
  url: string
  timeout: number

  constructor(url: string, timeout: number) {
    super(`Request timeout after ${timeout}ms: ${url}`)
    this.name = 'TimeoutError'
    this.url = url
    this.timeout = timeout
  }
}

/**
 * Log request details
 */
function logRequest(
  method: string,
  url: string,
  startTime: number,
  endTime: number,
  status?: number,
  error?: Error,
) {
  const duration = endTime - startTime
  const timestamp = new Date().toISOString()

  const baseLog = {
    timestamp,
    method,
    url,
    duration: `${duration}ms`,
    status,
  }

  if (error) {
    console.error(
      JSON.stringify({
        ...baseLog,
        error: error.message,
        stack: error.stack,
      }),
    )
  } else {
    if (http.isDebugHttpLog) {
      console.log(JSON.stringify(baseLog))
    }

    // Log slow requests separately
    if (duration > http.httpLogSlowTime) {
      console.warn(
        JSON.stringify({
          ...baseLog,
          type: 'SLOW_REQUEST',
        }),
      )
    }
  }
}

/**
 * Append query parameters to a URL
 */
function appendQueryParams(url: string, params?: Record<string, any>): string {
  if (!params) return url

  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value))
    }
  })

  const queryString = searchParams.toString()
  if (!queryString) return url

  return url + (url.includes('?') ? '&' : '?') + queryString
}

/**
 * Add timeout capability to fetch
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number },
): Promise<Response> {
  const { timeout = 30000, ...fetchOptions } = options

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    })
    return response
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new TimeoutError(url, timeout)
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}

/**
 * Core request function
 */
async function request<T = any>(
  method: string,
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    baseUrl = '',
    params,
    timeout = 30000,
    logging = true,
    slowThreshold = 1000,
    headers = {},
    defaultHeaders = {},
    ...fetchOptions
  } = options

  // Build full URL
  const url = appendQueryParams(`${baseUrl}${endpoint}`, params)

  // Track request timing
  const startTime = Date.now()
  let status: number | undefined

  try {
    // Execute fetch with timeout
    const response = await fetchWithTimeout(url, {
      ...fetchOptions,
      method,
      headers: {
        'Content-Type': 'application/json',
        node: 'camel',
        ...defaultHeaders,
        ...headers,
      },
      timeout,
    })

    status = response.status

    // Parse response body
    let body: any
    const contentType = response.headers.get('content-type')

    if (contentType?.includes('application/json')) {
      body = await response.json()
    } else if (contentType?.includes('text/')) {
      body = await response.text()
    } else {
      body = await response.blob()
    }

    // Handle successful responses
    if (response.ok) {
      if (logging) {
        logRequest(method, url, startTime, Date.now(), status)
      }
      return body as T
    }

    // Handle error responses
    const error = new ApiError(response, body)
    if (logging) {
      logRequest(method, url, startTime, Date.now(), status, error)
    }
    throw error
  } catch (error: any) {
    if (logging) {
      logRequest(method, url, startTime, Date.now(), status, error)
    }
    // Re-throw the error to be handled by the caller
    throw error
  }
}

/**
 * HTTP client with method shortcuts and configurable default headers and base URL
 */
export const http = {
  isDebugHttpLog: henv('X_DEBUG_HTTP_LOG') !== '0', //defalt enable log, 1: enable debug log, 0: disable debug log
  httpLogSlowTime: parseInt(henv('X_HTTP_LOG_SLOW_TIME')) || 500, //defalt 500ms slow log threshold

  /**
   * Configure default headers for all requests
   * Only effect on server components
   */
  setDefaultHeaders(headers: Record<string, string>) {
    const defaultHeaders = getDefaultHeaders()
    // Clear existing headers
    Object.keys(defaultHeaders).forEach((key) => delete defaultHeaders[key])
    // Add new headers
    Object.assign(defaultHeaders, headers)
    return this
  },

  /**
   * Add a single default header
   * Only effect on server components
   */
  setDefaultHeader(name: string, value: string) {
    const defaultHeaders = getDefaultHeaders()
    defaultHeaders[name] = value
    return this
  },

  /**
   * Set default base URL for all requests
   * Only effect on server components
   */
  setBaseUrl(url: string) {
    const baseUrl = getBaseUrl()
    baseUrl.value = url
    return this
  },

  request,

  get<T = any>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>('GET', endpoint, {
      baseUrl: getBaseUrl().value,
      ...options,
      headers: {
        ...getDefaultHeaders(),
        ...(options?.headers || {}),
      },
    })
  },

  post<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions,
  ): Promise<T> {
    return request<T>('POST', endpoint, {
      baseUrl: getBaseUrl().value,
      ...options,
      headers: {
        ...getDefaultHeaders(),
        ...(options?.headers || {}),
      },
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  put<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions,
  ): Promise<T> {
    return request<T>('PUT', endpoint, {
      baseUrl: getBaseUrl().value,
      ...options,
      headers: {
        ...getDefaultHeaders(),
        ...(options?.headers || {}),
      },
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  patch<T = any>(
    endpoint: string,
    data?: any,
    options?: RequestOptions,
  ): Promise<T> {
    return request<T>('PATCH', endpoint, {
      baseUrl: getBaseUrl().value,
      ...options,
      headers: {
        ...getDefaultHeaders(),
        ...(options?.headers || {}),
      },
      body: data ? JSON.stringify(data) : undefined,
    })
  },

  delete<T = any>(endpoint: string, options?: RequestOptions): Promise<T> {
    return request<T>('DELETE', endpoint, {
      baseUrl: getBaseUrl().value,
      ...options,
      headers: {
        ...getDefaultHeaders(),
        ...(options?.headers || {}),
      },
    })
  },
}

export default http
