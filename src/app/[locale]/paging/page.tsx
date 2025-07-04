import { httpapi } from '@/api/httpapi'
import { setupRequestLocaleAndHttpConfig } from '@/lib/setup-locale-http'
import Link from 'next/link'

type Props = {
  params: {
    locale: string
  }
}

export default async function Page({ params }: Props) {
  const { locale } = params
  setupRequestLocaleAndHttpConfig(locale)
  const { products } = await httpapi.products()

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Products</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="rounded-lg border p-4">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="mt-2">{product.description}</p>
            <div className="mt-4">
              <Link
                href={`/${locale}/paging/${product.id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
