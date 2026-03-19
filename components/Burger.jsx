"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Burger({ session }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Burger button */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <XMarkIcon className="w-6" />
        ) : (
          <Bars3Icon className="w-6" />
        )}
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-gray-600 flex flex-col gap-4 p-4 md:hidden">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/blog" onClick={() => setOpen(false)}>Blog</Link>
          {session && (
            <Link href="/dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </Link>
          )}
        </div>
      )}
    </>
  );
}