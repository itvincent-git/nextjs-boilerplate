import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="w-full">
      <div className="container mx-auto my-8 space-y-4 bg-neutral-200 p-4">
        Container
        <div className="flex h-32 justify-center bg-red-200">
          <Button variant="outline">A</Button>
          <Button variant="outline">B</Button>
        </div>
        <div className="flex h-32 items-center bg-blue-100">
          <Button variant="outline">A</Button>
          <Button variant="outline">B</Button>
        </div>
      </div>
    </div>
  )
}
