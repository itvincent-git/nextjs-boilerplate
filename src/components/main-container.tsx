export default function MainContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-10 xl:max-w-5xl xl:grid-cols-[minmax(0,1fr)_var(--container-2xs)]">
      <div className="space-y-4 px-4 pb-24 pt-10 sm:px-6 xl:pr-0">
        {children}
      </div>
    </div>
  )
}
