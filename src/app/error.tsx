'use client'
import React from 'react'
import ErrorView from '@/components/error-view'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.error('An error occurred:', error)
  return <ErrorView error={error} reset={reset} />
}
