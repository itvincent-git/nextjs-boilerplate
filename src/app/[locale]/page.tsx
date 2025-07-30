import Image from 'next/image'

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <h1 className="text-center text-4xl font-bold sm:text-left">
          Welcome to Next Boilerplate
        </h1>
        <p className="text-center text-lg sm:text-left">
          This is the homepage of our system, designed to provide you with a
          seamless and efficient user experience. Explore the features and start
          using the system today!
        </p>

        <ol className="list-inside list-decimal text-center font-[family-name:var(--font-geist-mono)] text-sm sm:text-left">
          <li className="mb-2">
            Get started by exploring the features and functionalities available
            in this system.
          </li>
          <li>Customize your experience to suit your needs.</li>
          <li>
            Save and see your changes instantly as you interact with the system.
          </li>
        </ol>
      </main>
    </div>
  )
}
