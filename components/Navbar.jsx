import Link from "next/link";
import { HomeIcon } from "@heroicons/react/16/solid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import AuthSection from "@/components/AuthSection";
import Burger from "@/components/Burger";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="w-full bg-gray-600 border-b shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left */}
        <div className="px-4 flex items-center gap-10">
          <Link href="/">
            <HomeIcon className="w-10 cursor-pointer" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-gray-800">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            {session && <Link href="/dashboard">Dashboard</Link>}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <AuthSection session={session} />

          {/*  Mobile Menu */}
          <Burger session={session} />
        </div>

      </div>
    </nav>
  );
}