import { httpapi } from '@/api/httpapi'
import { Link, routing } from '@/i18n/routing'
import http from '@/lib/api-client'
import { setupRequestLocaleAndHttpConfig } from '@/lib/setup-locale-http'
import dayjs from 'dayjs'

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  throw new Error('This page is to test error boundary')
}
