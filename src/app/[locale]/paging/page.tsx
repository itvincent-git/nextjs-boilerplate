import { httpapi } from '@/api/httpapi'
import { setupRequestLocaleAndHttpConfig } from '@/lib/setup-locale-http'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type Params = Promise<{ locale: string }>

export default async function Page({ params }: { params: Params }) {
  const { locale } = await params
  setupRequestLocaleAndHttpConfig(locale)
  const { products } = await httpapi.products()

  return (
    <Card className="container mx-auto p-4">
      <CardHeader>
        <CardTitle className="mb-4 text-2xl font-bold">Products</CardTitle>
      </CardHeader>
      <CardContent>
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
                  <Link href={`/${locale}/paging/${product.id}`}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
