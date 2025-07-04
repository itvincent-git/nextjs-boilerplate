import http, { RequestOptions } from '@/lib/api-client'

/**
 * http api 接口, 底层使用fetch方法
 */
export const httpapi = {
  posts: () =>
    http.get<PostsResponse>('/posts', {
      params: { limit: 20 },
    }),
  post: (id: string) => http.get<Post>(`/post/${id}`),
}
