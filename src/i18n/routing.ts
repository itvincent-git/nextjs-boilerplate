import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'
import { ComponentProps } from 'react'
import React from 'react'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'zh-cn'],

  // Used when no locale matches
  defaultLocale: 'en',
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {
  Link: OriginalLink,
  redirect,
  usePathname,
  useRouter,
  permanentRedirect,
  getPathname,
} = createNavigation(routing)

// Create a custom Link component with prefetch disabled by default
export const Link = (props: ComponentProps<typeof OriginalLink>) => {
  return React.createElement(OriginalLink, { ...props, prefetch: false })
}
