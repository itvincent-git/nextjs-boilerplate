import http, { RequestOptions } from '@/lib/api-client'
import { Post } from './types'

/**
 * http api 接口, 底层使用fetch方法
 */
export const httpapi = {
  todos: () => http.get<Post[]>('/todos'),
  todo: (id: string) => http.get<Post>(`/todos/${id}`),
}
