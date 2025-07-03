import { httpapi } from '@/api/httpapi'
import { routing } from '@/i18n/routing'
import { setupRequestLocaleAndHttpConfig } from '@/lib/setup-locale-http'
import { setRequestLocale } from 'next-intl/server'

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
// export const dynamicParams = true // or false, to 404 on unknown paths

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setupRequestLocaleAndHttpConfig(locale)

  const posts: Post[] = await httpapi.todos()

  console.info(
    'ISR page rendered at',
    new Date().toISOString(),
    (await params).locale,
  )
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Todo List</h1>
          <p className="text-sm text-gray-600">
            Last updated: {new Date().toISOString()}
          </p>
        </div>

        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="rounded-lg bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                  {post.id}
                </span>
                <h2 className="line-clamp-1 text-lg font-medium text-gray-900">
                  {post.title}
                </h2>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
