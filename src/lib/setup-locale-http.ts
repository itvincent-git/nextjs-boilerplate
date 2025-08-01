import http from '@/lib/api-client'
import henv from '@/lib/henv'
import { setRequestLocale } from 'next-intl/server'

/**
 * Async function: Sets the request locale and HTTP configuration.
 * Should be called before all httpapi requests.
 *
 * This function sets the correct locale and HTTP configuration before making requests,
 * ensuring the server can handle requests according to the provided settings.
 * It first sets the request locale, then configures the default language and base URL for HTTP requests.
 *
 * @param locale Language code to set as the request locale.
 */
export async function setupRequestLocaleAndHttpConfig(locale: string) {
  // Enable static rendering
  setRequestLocale(locale)

  // Set default language
  http.setDefaultHeader('Accept-Language', locale)
  // Set base URL, only for server component
  http.setBaseUrl(henv('X_HTTP_INTERNAL_BASE') || henv('X_HTTP_BASE') || '')

  http.setDefaultRequestOptionsConfig({
    logging: parseInt(henv('X_HTTP_LOG_LEVEL') || '3'), // default to 3, 0: disable, 1: error, 3: error+slow, 10: all
    slowThreshold: parseInt(henv('X_HTTP_LOG_SLOW_TIME') || '1000'), // default 1000ms slow log threshold
  })
}
