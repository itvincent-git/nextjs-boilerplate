import http from '@/lib/api-client'
import henv from '@/lib/henv'
import { setRequestLocale } from 'next-intl/server'

/**
 * 异步函数：设置请求的语言环境和HTTP配置
 * 需要在所有httpapi请求之前调用此函数
 *
 * 此函数用于在进行请求之前设置正确的语言环境和HTTP配置，以确保服务器能够根据请求的配置正确处理请求
 * 它首先设置请求的语言环境，然后配置HTTP请求的默认语言和基础URL
 *
 * @param locale 语言代码，表示要设置的语言环境
 */
export async function setupRequestLocaleAndHttpConfig(locale: string) {
  // Enable static rendering
  setRequestLocale(locale)

  // 设置默认语言
  http.setDefaultHeader('Accept-Language', locale)
  // 设置基础URL, only for server component
  http.setBaseUrl(
    henv('X_HTTP_INTERNAL_BASE') !== undefined
      ? henv('X_HTTP_INTERNAL_BASE')
      : henv('X_HTTP_BASE'),
  )

  http.setDefaultRequestOptionsConfig({
    logging: henv('X_DEBUG_HTTP_LOG') !== '0', //defalt enable log, 1: enable debug log, 0: disable debug log
    slowThreshold: parseInt(henv('X_HTTP_LOG_SLOW_TIME') || '1000'), //defalt 1000ms slow log threshold
  })
}
