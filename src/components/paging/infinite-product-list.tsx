'use client'

import { useState, useEffect } from 'react'
import { httpapi } from '@/api/httpapi'
import PagingCardContent from '@/components/paging/paging-card-content'
import { useInView } from 'react-intersection-observer'

export default function InfiniteProductList({
  initialProducts,
}: {
  initialProducts: Product[]
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [hasMore, setHasMore] = useState(true)
  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView && hasMore) {
      const loadMoreProducts = async () => {
        const nextSkip = products.length
        const { products: newProducts } = await httpapi.products(nextSkip)
        if (newProducts.length > 0) {
          setProducts((prevProducts) => [...prevProducts, ...newProducts])
        } else {
          setHasMore(false)
        }
      }
      loadMoreProducts()
    }
  }, [inView, hasMore, products])

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
