"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthSection() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (!session) {
    return (
      <Link href="/login" className="border border-border rounded-lg px-4 py-1.5 hover:bg-surface-muted">
        Login
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4 font-medium text-text-primary">
      <Link href="/dashboard" className="hidden md:block  hover:text-brand-500 transition-colors">
        Dashboard
      </Link>

      <span className="text-text-muted text-sm hidden md:block">Logged in as {session.user.email}</span>

      <button className="border border-border rounded-lg px-4 py-1.5 hover:bg-surface-muted hidden md:block" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
}