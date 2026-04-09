"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";  
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";


export default function Burger() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
 

  return (
    <>
      {/* Burger button */}
      <button
        className="md:hidden text-text-primary hover:text-brand-500 transition-colors cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Mobile dropdown */}
      {open &&  (
        
             <div className="absolute top-full left-0 w-full z-50 bg-surface border-t border-b border-border shadow-md flex flex-col p-4 gap-1 md:hidden">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="px-3 py-2 rounded-lg text-text-primary font-medium hover:bg-surface-muted transition-colors"
          >
            Home
          </Link>
          <Link
            href="/blog"
            onClick={() => setOpen(false)}
            className="px-3 py-2 rounded-lg text-text-primary font-medium hover:bg-surface-muted transition-colors"
          >
            Blog
          </Link>
          {status === "authenticated" ? (
          <>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-lg text-text-primary font-medium hover:bg-surface-muted transition-colors"
            >
              Dashboard
            </Link>

            <button
              className="border border-border rounded-lg px-4 py-1.5 hover:bg-surface-muted"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </>
        ) : (
      <Link href="/login" className="border border-border rounded-lg px-4 py-1.5 hover:bg-surface-muted">
        Login
      </Link>
        )}
  
      
        
        </div>
        
      )}
    </>
  );
}