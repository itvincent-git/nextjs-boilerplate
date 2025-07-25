'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ErrorView({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.log('logging error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-[420px]">
        <CardHeader className="text-center">
          <CardTitle>Something went wrong!</CardTitle>
          <CardDescription>
            An unexpected error occurred. Please try again later.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center gap-2">
          <Button onClick={() => window.location.reload()}>Try Again</Button>
          <Button asChild>
            <Link href="/">Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
