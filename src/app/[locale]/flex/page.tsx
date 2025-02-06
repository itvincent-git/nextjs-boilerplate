import MainContainer from '@/components/main-container'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <MainContainer>
      <h1 className="text-2xl font-bold">Flex</h1>

      <h2 className="text-lg font-bold">justify-content</h2>
      <div className="flex h-32 justify-center bg-neutral-100">
        <Button variant="outline">A</Button>
        <Button variant="outline">B</Button>
      </div>
      <div className="flex h-32 justify-end bg-neutral-100">
        <Button variant="outline">A</Button>
        <Button variant="outline">B</Button>
      </div>
      <div className="flex h-32 justify-between bg-neutral-100">
        <Button variant="outline">A</Button>
        <Button variant="outline">B</Button>
        <Button variant="outline">C</Button>
      </div>

      <h2 className="text-lg font-bold">content-</h2>
      <p className="mt-6 text-base/7 text-gray-700">
        Utilities for controlling how rows are positioned in multi-row flex and
        grid containers.
      </p>
      <div className="flex h-32 flex-wrap content-center bg-neutral-100">
        <Button variant="outline" className="w-2/5">
          A
        </Button>
        <Button variant="outline" className="w-2/5">
          B
        </Button>
        <Button variant="outline" className="w-2/5">
          C
        </Button>
      </div>

      <h2 className="text-lg font-bold">items-</h2>
      <p className="mt-6 text-base/7 text-gray-700">
        Utilities for controlling how flex and grid items are positioned along a
        container&apos;s cross axis.
      </p>
      <div className="flex h-32 items-end bg-neutral-100">
        <Button variant="outline">A</Button>
        <Button variant="outline" className="h-16">
          B
        </Button>
        <Button variant="outline">C</Button>
      </div>

      <h2 className="text-lg font-bold">self</h2>
      <p className="mt-6 text-base/7 text-gray-700">
        Utilities for controlling how an individual flex or grid item is
        positioned along its container&apos;s cross axis.
      </p>
      <div className="flex h-32 bg-neutral-100">
        <Button variant="outline">A</Button>
        <Button variant="outline" className="h-16 self-end">
          B
        </Button>
        <Button variant="outline">C</Button>
      </div>

      <h2 className="text-lg font-bold">place-content-</h2>
      <p className="mt-6 text-base/7 text-gray-700">
        Utilities for controlling how content is justified and aligned at the
        same time. Class
      </p>
      <div className="flex h-32 flex-wrap place-content-center bg-neutral-100">
        <Button variant="outline" className="w-2/5">
          A
        </Button>
        <Button variant="outline" className="w-2/5">
          B
        </Button>
        <Button variant="outline" className="w-2/5">
          C
        </Button>
      </div>
    </MainContainer>
  )
}
