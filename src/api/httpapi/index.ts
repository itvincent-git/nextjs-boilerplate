import http, { RequestOptions } from '@/lib/api-client'

/**
 * http api base on fetch api.
 * Use for server render component.
 */
export const httpapi = {
  /**
   * post list
   * @returns
   */
  posts: () =>
    http.get<PostsResponse>('/posts', {
      params: { limit: 20 },
    }),

  /**
   * post detail
   * @param id post id
   * @returns
   */
  post: (id: string) => http.get<Post>(`/post/${id}`),

  /**
   * product list
   * @returns
   */
  products: (skip: number = 0, limit: number = 20) =>
    http.get<ProductsResponse>('/products', {
      params: { skip, limit },
    }),

  /**
   * product detail
   * @param id product id
   * @returns
   */
  product: (id: string) => http.get<Product>(`/products/${id}`),
}
