import MainContainer from '@/components/main-container'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <MainContainer>
      <h1 className="text-2xl font-bold">Position</h1>

      <h2 className="text-lg font-bold">static</h2>
      <div className="relative h-[200px] w-[600px] overflow-auto rounded bg-neutral-100 text-sm">
        <div className="p-4">
          relative: an element’s original position remains in the flow of the
          document, just like the static value. But now
          left/right/top/bottom/z-index will work. The positional properties
          “nudge” the element from the original position in that direction.
        </div>
        <div className="static rounded bg-blue-200 p-4">
          static: every element has a static position by default, so the element
          will stick to the normal page flow. So if there is a
          left/right/top/bottom/z-index set then there will be no effect on that
          element.
        </div>
        <div className="absolute bottom-0 right-0 h-24 w-2/5 overflow-hidden bg-red-100 p-4">
          absolute:the element is removed from the flow of the document and
          other elements will behave as if it’s not even there whilst all the
          other positional properties will work on it.
        </div>

        <div className="fixed bottom-0 left-0 h-24 w-2/5 overflow-hidden text-ellipsis bg-green-100 p-4">
          fixed: the element is removed from the flow of the document like
          absolutely positioned elements. In fact they behave almost the same,
          only fixed positioned elements are always relative to the document,
          not any particular parent, and are unaffected by scrolling.
        </div>

        <div className="sticky bottom-0 left-0 h-24 w-2/5 overflow-hidden bg-cyan-100 p-4">
          sticky: the element is treated like a relative value until the scroll
          location of the viewport reaches a specified threshold, at which point
          the element takes a fixed position where it is told to stick.
        </div>
      </div>
    </MainContainer>
  )
}
