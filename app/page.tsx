'use client'
import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center lg:text-left">
          Welcome to One Site
        </h1>
      </div>

      <div className="relative flex place-items-center">
        <div className="text-center">
          <h2 className="mb-3 text-2xl font-semibold">
            A Modern Next.js Application
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Deployed successfully on Vercel
          </p>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <p className="mb-4 text-lg">Counter: {count}</p>
            <div className="space-x-4">
              <button
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Increment
              </button>
              <button
                onClick={() => setCount(0)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h3 className="mb-3 text-2xl font-semibold">
            Next.js
          </h3>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Built with the latest Next.js 14 for optimal performance
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h3 className="mb-3 text-2xl font-semibold">
            TypeScript
          </h3>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Full TypeScript support for type safety
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h3 className="mb-3 text-2xl font-semibold">
            Tailwind CSS
          </h3>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Styled with Tailwind CSS for modern design
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h3 className="mb-3 text-2xl font-semibold">
            Vercel Ready
          </h3>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Optimized for seamless Vercel deployment
          </p>
        </div>
      </div>
    </main>
  )
}
