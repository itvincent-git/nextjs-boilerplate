'use client'

import { useEffect } from 'react'
import { httpapi } from '@/api/httpapi'
import PagingCardContent from '@/components/paging/paging-card-content'
import { useInView } from 'react-intersection-observer'
import useSWRInfinite from 'swr/infinite'

const limit = 20
const getKey = (pageIndex: number, previousPageData: Product[]) => {
  if (previousPageData && !previousPageData.length) return null // reached the end
  return `products?skip=${pageIndex * limit}&limit=10`
}

const fetcher = async (url: string) => {
  const skip = Number(new URLSearchParams(url.split('?')[1]).get('skip'))
  const { products } = await httpapi.products(skip, limit)
  return products
}

export default function InfiniteProductListSWR({
  initialProducts,
}: {
  initialProducts: Product[]
}) {
  const {
    data: productsData,
    size,
    setSize,
    isValidating,
  } = useSWRInfinite(getKey, fetcher, {
    fallbackData: [initialProducts],
    revalidateFirstPage: false,
  })

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 100,
  })

  const products = productsData ? productsData.flat() : []
  const hasMore = productsData
    ? productsData[productsData.length - 1]?.length > 0
    : true

  useEffect(() => {
    if (inView && !isValidating) {
      setSize(size + 1)
    }
  }, [inView, isValidating, size, setSize])

  return (
    <div>
      <PagingCardContent products={products} />
      {hasMore && (
        <div ref={ref} className="text-center">
          Loading...
        </div>
      )}
    </div>
  )
}
