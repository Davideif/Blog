// components/Navbar.js
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/16/solid";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-600 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="px-4 flex items-centre gap-10">
          <Link href="/">
            <HomeIcon
              alt="Logo" 
              className="w-10 h-auto cursor-pointer" 
            />
          </Link>

          {/* Page Links */}
          <div className="hidden md:flex items-center gap-6 text-gray-800">
            <Link href="/" className=" hover:text-black">Home</Link>
            <Link href="/blog" className="hover:text-black">Blog</Link>
            <Link href="/dashboard" className="hover:text-black">Dashboard</Link>
          </div>
        </div>

        {/* Right: Search + Login */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg px-3 py-1 focus:outline-none focus:ring focus:ring-gray-300"
          />
          <Link 
            href="/login" 
            className="px-4 py-1 border rounded-lg hover:bg-gray-100"
          >
            Login
          </Link>
        </div>

      </div>
    </nav>
  );
}
