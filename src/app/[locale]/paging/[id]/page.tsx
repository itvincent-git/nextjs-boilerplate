import { httpapi } from '@/api/httpapi'
import { setupRequestLocaleAndHttpConfig } from '@/lib/setup-locale-http'
import Image from 'next/image'
import dayjs from 'dayjs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { id, locale } = await params
  setupRequestLocaleAndHttpConfig(locale)
  const product = await httpapi.product(id)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <Card className="container m-2 p-4">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{product.title}</CardTitle>
        <CardDescription className="text-gray-600">
          ID: {product.id}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg">{product.description}</p>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Tags:</span>
          {product.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <div>
          <span className="font-semibold">Price:</span> ${product.price}
        </div>
        <div>
          <span className="font-semibold">Discount:</span>{' '}
          {product.discountPercentage}%
        </div>
        <div>
          <span className="font-semibold">Rating:</span> {product.rating}
        </div>
        <div>
          <span className="font-semibold">Stock:</span> {product.stock}
        </div>
        <div>
          <span className="font-semibold">Brand:</span> {product.brand}
        </div>
        <div>
          <span className="font-semibold">SKU:</span> {product.sku}
        </div>
        <div>
          <span className="font-semibold">Weight:</span> {product.weight}g
        </div>
        <div>
          <span className="font-semibold">Dimensions:</span>{' '}
          {product.dimensions.width} x {product.dimensions.height} x{' '}
          {product.dimensions.depth}
        </div>
        <div>
          <span className="font-semibold">Warranty:</span>{' '}
          {product.warrantyInformation}
        </div>
        <div>
          <span className="font-semibold">Shipping:</span>{' '}
          {product.shippingInformation}
        </div>
        <div>
          <span className="font-semibold">Availability:</span>{' '}
          {product.availabilityStatus}
        </div>
        <div>
          <span className="font-semibold">Return Policy:</span>{' '}
          {product.returnPolicy}
        </div>
        <div>
          <span className="font-semibold">Minimum Order:</span>{' '}
          {product.minimumOrderQuantity}
        </div>
        <Separator />
        <div>
          <h2 className="mt-8 text-2xl font-bold">Reviews</h2>
          {product.reviews.map((review, index) => (
            <Card key={index} className="mt-4 pt-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="font-semibold">Rating:</span>
                  <span>{review.rating}</span>
                </CardTitle>
                <CardDescription className="mt-2">
                  {review.comment}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-2 text-sm text-gray-500">
                <span>{review.reviewerName}</span> -{' '}
                <span>{dayjs(review.date).format('DD/MM/YYYY')}</span>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          <Image
            src={product.thumbnail}
            alt={product.title}
            className="mt-8"
            width={200}
            height={200}
          />
        </div>
        <div className="mt-8 grid grid-cols-3 gap-4">
          {product.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`${product.title} image ${index + 1}`}
              className="h-auto w-full"
              width={500}
              height={500}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
