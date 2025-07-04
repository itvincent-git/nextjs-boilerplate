import { httpapi } from '@/api/httpapi'
import { setupRequestLocaleAndHttpConfig } from '@/lib/setup-locale-http'
import Image from 'next/image'
import dayjs from 'dayjs'

type Props = {
  params: {
    id: string
    locale: string
  }
}

export default async function Page({ params }: Props) {
  const { id, locale } = await params
  setupRequestLocaleAndHttpConfig(locale)
  const product = await httpapi.product(id)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <div className="text-gray-600">ID: {product.id}</div>
        <p className="text-lg">{product.description}</p>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Tags:</span>
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-200 px-2 py-1 text-sm"
            >
              {tag}
            </span>
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
        <div>
          <h2 className="mt-8 text-2xl font-bold">Reviews</h2>
          {product.reviews.map((review, index) => (
            <div key={index} className="mt-4 border-t pt-4">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Rating:</span>
                <span>{review.rating}</span>
              </div>
              <p className="mt-2">{review.comment}</p>
              <div className="mt-2 text-sm text-gray-500">
                <span>{review.reviewerName}</span> -{' '}
                <span>{dayjs(review.date).format('DD/MM/YYYY')}</span>
              </div>
            </div>
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
      </div>
    </div>
  )
}
