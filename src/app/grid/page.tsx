import MainContainer from '@/components/main-container'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function Page() {
  return (
    <MainContainer>
      <h2 className="mb-4 text-xl font-bold">Grid</h2>

      <h2 className="text-lg font-bold">grid-cols-</h2>
      <div className="grid grid-cols-3 gap-4 bg-neutral-100 p-4">
        <Button variant="outline">A</Button>
        <Button variant="outline">B</Button>
        <Button variant="outline" className="col-span-2">
          C
        </Button>
        <Button variant="outline">D</Button>
        <Button variant="outline">E</Button>
        <Button variant="outline">F</Button>
      </div>
      <Separator />

      <h2 className="text-lg font-bold">grid-rows-</h2>
      <div className="grid grid-flow-col grid-rows-3 gap-4 bg-neutral-100 p-4">
        <Button variant="outline">A</Button>
        <Button variant="outline">B</Button>
        <Button variant="outline" className="row-span-2">
          C
        </Button>
        <Button variant="outline">D</Button>
        <Button variant="outline">E</Button>
        <Button variant="outline">F</Button>
      </div>

      <Separator />

      <h2 className="text-lg font-bold">justify-items</h2>
      <div className="grid grid-cols-3 justify-items-center gap-4 bg-neutral-100 p-4">
        <Button variant="outline">A</Button>
        <Button variant="outline">B</Button>
        <Button variant="outline" className="justify-self-start">
          C
        </Button>
        <Button variant="outline">D</Button>
        <Button variant="outline">E</Button>
        <Button variant="outline">F</Button>
      </div>
    </MainContainer>
  )
}
