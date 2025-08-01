import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import Script from 'next/script'
import { ApiClientProvider } from '@/components/api-client-provider'
import henv from '@/lib/henv'
import { setupRequestLocaleAndHttpConfig } from '@/lib/setup-locale-http'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Next Boilerplate',
  description:
    'A production-ready Next.js foundation pre-configured with Shadcn UI components and modern development tools. Built for crafting scalable, type-safe applications with enterprise-grade best practices.',
}

const ScriptLayout = () => {
  return (
    <>
      <Script id="env-browser" strategy="beforeInteractive">
        {`window.env = {
                        X_HTTP_BASE: '${process.env.X_HTTP_BASE}',
                   
                    }
                    `}
      </Script>
    </>
  )
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setupRequestLocaleAndHttpConfig(locale)

  return (
    <html>
      <body className={`${geistMono.variable} antialiased`}>
        <ScriptLayout />
        <NextIntlClientProvider locale={locale}>
          <ApiClientProvider
            config={{
              baseUrl: henv('X_HTTP_BASE') || '',
              headers: { 'Accept-Language': locale },
              requestOptionsConfig: {
                logging: parseInt(henv('X_HTTP_LOG_LEVEL') || '3'), //defalt enable log, 1: enable debug log, 0: disable debug log
                slowThreshold: parseInt(henv('X_HTTP_LOG_SLOW_TIME') || '1000'), //defalt 1000ms slow log threshold
              },
            }}
          >
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb Page</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </header>
                {children}
              </SidebarInset>
            </SidebarProvider>
          </ApiClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
