import { httpapi } from '@/api/httpapi'
import { Link, routing } from '@/i18n/routing'
import { setupRequestLocaleAndHttpConfig } from '@/lib/setup-locale-http'

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

  const posts: Todo[] = await httpapi.todos()

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Todo List</h1>
          <p className="text-sm text-gray-600">
            Last updated: {new Date().toISOString()}
          </p>
          <p className="mt-2 text-base text-gray-700">
            This page demonstrates Incremental Static Regeneration (ISR). The
            content is revalidated every 60 seconds.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Click on a todo item to view its details.
          </p>
        </div>

        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/isr/${post.id}`}
                className="block rounded-lg bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                    {post.id}
                  </span>
                  <h2 className="line-clamp-1 text-lg font-medium text-gray-900">
                    {post.task_name}
                  </h2>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
