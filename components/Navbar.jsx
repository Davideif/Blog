import Link from "next/link";
import { HomeIcon } from "@heroicons/react/16/solid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import AuthSection from "@/components/AuthSection";
import Burger from "@/components/Burger";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="w-full bg-surface border-b border-border shadow-sm relative">
  <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

    {/* Left */}
    <div className="flex items-center gap-10">
      <Link href="/">
        <HomeIcon className="w-6 h-6 text-text-primary cursor-pointer hover:text-brand-500 transition-colors" />
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6 font-medium">
        <Link href="/" className="text-text-primary hover:text-brand-500 transition-colors">Home</Link>
        <Link href="/blog" className="text-text-primary hover:text-brand-500 transition-colors">Blog</Link>
        {session && (
          <Link href="/dashboard" className="text-text-primary hover:text-brand-500 transition-colors">Dashboard</Link>
        )}
      </div>
    </div>

    {/* Right */}
    <div className="flex items-center gap-4">
      <AuthSection session={session} />
      <Burger session={session} />
    </div>

  </div>
</nav>
   
  );
}