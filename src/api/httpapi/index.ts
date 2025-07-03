import http, { RequestOptions } from '@/lib/api-client'

/**
 * http api 接口, 底层使用fetch方法
 */
export const httpapi = {
  todos: () => http.get<Post[]>('/todos'),
}
