'use client'

import { http } from '@/lib/api-client'
import React, { ReactNode, useEffect } from 'react'

interface ApiClientProviderProps {
  children: ReactNode
  config: {
    baseUrl: string
    headers: Record<string, string>
  }
}

export function ApiClientProvider({
  children,
  config,
}: ApiClientProviderProps) {
  useEffect(() => {
    if (config.baseUrl) {
      http.setBaseUrl(config.baseUrl)
    }
    if (config.headers) {
      http.setDefaultHeaders(config.headers)
    }
  }, [config])

  return <>{children}</>
}
