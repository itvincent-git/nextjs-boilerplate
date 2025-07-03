import { httpapi } from '@/api/httpapi'
import { setupRequestLocaleAndHttpConfig } from '@/lib/setup-locale-http'

type Props = {
  params: {
    id: string
    locale: string
  }
}

export default async function Page({ params }: Props) {
  const { id, locale } = await params
  setupRequestLocaleAndHttpConfig(locale)
  let post: Todo | null = null
  try {
    post = await httpapi.todo(id)
  } catch (error) {
    console.error(error)
  }

  if (!post) {
    return <div>Todo not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{post.task_name}</h1>
      <p className="mt-4">{post.task_description}</p>
    </div>
  )
}
