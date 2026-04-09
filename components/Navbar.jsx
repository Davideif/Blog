import Link from "next/link";
import { HomeIcon } from "@heroicons/react/16/solid";
import AuthSection from "@/components/AuthSection";
import Burger from "@/components/Burger";
import SearchBar from "@/components/SearchBar";

export default function Navbar() {
  
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
      </div>
    </div>

    {/* SearchBar */}
    <div >
      <SearchBar />
    </div>

    {/* Right */}
    <div className="flex items-center gap-4">
      <AuthSection />
      <Burger />
    </div>

  </div>
</nav>
   
  );
}