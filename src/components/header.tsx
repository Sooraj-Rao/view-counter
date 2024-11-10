import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3">
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/docs" className="hover:text-gray-300">
              Documentation
            </Link>
          </li>
          <li>
            <Link href="/create" className="hover:text-gray-300">
              Create
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
