import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // regx to exclude the static resources, API routes, and other specific paths
  matcher: [
    '/((?!api|_next|media/|lib/|images/|.*\\.(?:jpg|jpeg|png|gif|svg|ico|css|js|json|webp|bmp|webmanifest|mp3|wav|ogg|aac|m4a|mp4|webm|ogv|avi|m4v|ts|m3u8|m3u|txt|ttf|ttc|otf|woff|woff2)$).*)',
  ],
}
