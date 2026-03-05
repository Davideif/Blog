"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function AuthSection({ session }) {

  // If NOT logged in
  if (!session) {
    return (
      <Link
        href="/login"
        className="px-4 py-1 border rounded-lg hover:bg-gray-100"
      >
        Login
      </Link>
    );
  }

  // If logged in 
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-white">
        Logged in as {session.user.email}
      </span>

      <button
        onClick={() => signOut()}
        className="px-4 py-1 border rounded-lg hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  );
}