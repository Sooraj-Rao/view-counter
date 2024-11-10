import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to View Counter</h1>
        <p className="text-xl mb-8">Create customizable view counters for your profiles and pages</p>
        <Link href="/create" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Create Your Counter
        </Link>
      </section>
    </div>
  )
}