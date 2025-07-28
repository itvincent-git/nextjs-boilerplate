'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'

export default function PagingCardContent({
  products,
}: {
  products: Product[]
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Card key={product.id} className="rounded-lg border p-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {product.title}
            </CardTitle>
            <CardDescription className="mt-2">
              {product.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="mt-4">
              <Link href={`/paging/${product.id}`}>View Details</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
