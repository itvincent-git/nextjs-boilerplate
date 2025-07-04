interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
}

interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

interface Dimensions {
  width: number
  height: number
  depth: number
}

interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

interface Meta {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}

interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: Dimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: Review[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: Meta
  thumbnail: string
  images: string[]
}
