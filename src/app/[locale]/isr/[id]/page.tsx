import { httpapi } from '@/api/httpapi'
import http from '@/lib/api-client'
import { setupRequestLocaleAndHttpConfig } from '@/lib/setup-locale-http'

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { id, locale } = await params
  setupRequestLocaleAndHttpConfig(locale)
  const post = await httpapi.post(id)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <div className="text-gray-600">ID: {post.id}</div>
        <p className="text-lg">{post.body}</p>
        <div className="flex items-center space-x-2">
          <span className="font-semibold">Tags:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-200 px-2 py-1 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span className="font-semibold">Likes:</span>
            <span>{post.reactions.likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-semibold">Dislikes:</span>
            <span>{post.reactions.dislikes}</span>
          </div>
        </div>
        <div>
          <span className="font-semibold">Views:</span> {post.views}
        </div>
        <div>
          <span className="font-semibold">User ID:</span> {post.userId}
        </div>
      </div>
    </div>
  )
}
