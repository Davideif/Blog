"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function AuthSection({ session }) {

  if (!session) {
    return (
      <Link
        href="/login"
        className="px-4 py-1.5 border border-border rounded-lg text-text-primary text-sm font-medium hover:bg-surface-muted transition-colors"
      >
        Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-text-muted">
        Logged in as {session.user.email}
      </span>

      <button
        onClick={() => signOut()}
        className="px-4 py-1.5 border border-border rounded-lg text-text-primary text-sm font-medium hover:bg-surface-muted transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
