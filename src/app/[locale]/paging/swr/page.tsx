import { httpapi } from '@/api/httpapi'
import { setupRequestLocaleAndHttpConfig } from '@/lib/setup-locale-http'
import InfiniteProductListSWR from '@/components/paging/infinite-product-list-swr'

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setupRequestLocaleAndHttpConfig(locale)
  const { products } = await httpapi.products()

  return <InfiniteProductListSWR initialProducts={products} />
}
